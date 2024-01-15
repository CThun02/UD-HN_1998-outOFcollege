package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;
import com.fpoly.ooc.responce.pdf.PdfResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.PaymentService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import com.fpoly.ooc.util.CommonUtils;
import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillServiceImpl billService;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Autowired
    private TimeLineService timeLineService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private DeliveryNoteService deliveryNoteService;


    //@Author: Nguyễn Công Thuần
    @Transactional(rollbackOn = RuntimeException.class)
    @Override
    public BillDetail createBillDetail(ProductDetailRequest request, String billCode) throws NotFoundException {
        //Request đối tượng thêm mới gửi xuống bao gồm: Số lượng thêm, giá hiện tại mua, id sản phẩm chi tiết
        Integer quantityAdd = request.getQuantity();
        BigDecimal price = request.getPrice();
        //Tìm hóa đơn đang chỉnh sửa
        Bill bill = billService.findBillByBillCode(billCode);

        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        Timeline timelineFromBillId = timeLineService.timelineFromBillId(bill.getId());
        if (!"wait_for_confirm".equalsIgnoreCase(bill.getStatus()) || !timelineFromBillId.getStatus().equalsIgnoreCase("1")) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_CANNOT_EDIT_WHEN_BILL_NOT_EQUAL_WAIT_FOR_CONFIRM));
        }

        BillDetail billDetail = BillDetail.builder().id(null)
                .bill(bill)
                .productDetail(ProductDetail.builder().id(request.getId()).build())
                .price(price)
                .quantity(quantityAdd)
                .status(Const.STATUS_ACTIVE)
                .build();
        //Tìm sản phẩm  tồn tại trong hóa đơn
        List<BillDetail> billDetails = billDetailRepo.findBillDetailsByProductDetailIdAndBillCode(request.getId(), billCode);
        //Tìm sản phẩm trong cửa hàng
        ProductDetail productDetail = productDetailService.getOne(request.getId());
        //kiểm tra điều kiện thỏa mãn hóa đơn với: quantityAdd là số lượng  thêm, giá
        //productDetail: sản phẩm mới thêm, price: giá sản phẩm mới thêm hiện tại(có thể có khuyến  mại giảm giá),
        //bill: hóa đơn chỉnh
        this.validateBill(quantityAdd, productDetail, price, bill);
        //Thỏa mãn tất cả điều kiện
        //Nếu sản phẩm tồn tại trong hóa đơn
        if(!billDetails.isEmpty()){
            //Kiểm tra giá sản phẩm(Ví dụ:Kết thúc khuyến mại), nếu giá không bằng nhau sẽ tạo hóa đơn chi tiết mới,
            //nếu bằng chỉnh sửa lại hóa đơn chi tiết cũ
            for (int i = 0; i < billDetails.size(); i++) {
                if(billDetails.get(i).getPrice().equals(price)){
                    billDetail = billDetails.get(i);
                    billDetail.setQuantity(billDetail.getQuantity()+quantityAdd);
                    billDetail.setPrice(price);
                    break;
                }
            }
        }
        productDetail.setQuantity(productDetail.getQuantity()-quantityAdd);
        this.saveOrUpdateBillDetail(billDetail, bill, productDetail);
        return billDetail;
    }

    //@Author: Nguyễn Công Thuần
    @Transactional(rollbackOn = RuntimeException.class)
    @Override
    public BillDetail updateBillDetail(ProductDetailRequest request, Long billDetailId) throws NotFoundException {
        if(request.getQuantity()<=0){
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_QUANTITY_INVALID));
        }
        BillDetail billDetail = billDetailRepo.findById(billDetailId).orElse(null);
        //Tìm hóa đơn đang chỉnh sửa
        Bill bill = billDetail.getBill();
        ProductDetail productDetail = productDetailService.findById(request.getId());
        //Request đối tượng thêm mới gửi xuống bao gồm: Số lượng thêm, giá hiện tại mua, id sản phẩm chi tiết

        Integer quantityUpdate = request.getQuantity();
        BigDecimal price = request.getPrice();
        //Nếu là sản phẩm cũ => có thể  tăng giảm số lượng sản phẩm
        if(billDetail.getProductDetail().getId().equals(request.getId())){
            if(billDetail.getQuantity()<request.getQuantity()){
                this.validateBill(request.getQuantity()-billDetail.getQuantity(), productDetail, price, bill);
            }
            productDetail.setQuantity(productDetail.getQuantity()+(billDetail.getQuantity() - quantityUpdate));
        }
        //Nếu là sản phẩm mới => trừ thẳng số  lượng sản phẩm, hoàn số lương sản phẩm cũ
        else{
            ProductDetail productDetailOld = billDetail.getProductDetail();
            if(quantityUpdate> productDetail.getQuantity()){
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
            }else if(price.multiply(BigDecimal.valueOf(quantityUpdate)).compareTo(BigDecimal.valueOf(10000000))>0){
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_PRICE_THAN_FIVE_MILLION));
            }
            productDetailOld.setQuantity(productDetailOld.getQuantity() + billDetail.getQuantity());
            try{
                productDetailService.update(productDetailOld);
            }catch (Exception e){
                e.printStackTrace();
            }
            productDetail.setQuantity(productDetail.getQuantity()-request.getQuantity());
        }
        billDetail = BillDetail.builder().id(billDetailId)
                .bill(bill)
                .productDetail(productDetail)
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();
        this.saveOrUpdateBillDetail(billDetail, bill, productDetail);
        return billDetail;
    }

    @Override
    public List<BillDetail> findBillDetailsByPDIdAndBillId(Long pDId, Long billId) throws NotFoundException {
        return billDetailRepo.findBillDetailsByProductDetailIdAndBillId(pDId, billId);
    }

    //@Author: Nguyễn Công Thuần
    private void saveOrUpdateBillDetail(BillDetail billDetail, Bill bill, ProductDetail productDetail) throws NotFoundException {
        billDetailRepo.save(billDetail);
        //Đặt lại giá cho hóa đơn
        BigDecimal priceBillUpdate = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBillUpdate);
        billService.updateBill(bill);
        try {
            productDetailService.update(productDetail);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    //@Author: Nguyễn Công Thuần
    //kiểm tra điều kiện thỏa mãn hóa đơn với: quantityAdd là số lượng  thêm, giá
    //productDetail: sản phẩm mới thêm, price: giá sản phẩm mới thêm hiện tại(có thể có khuyến  mại giảm giá),
    private void validateBill(int quantityAdd, ProductDetail productDetail, BigDecimal price, Bill bill) throws NotFoundException {
        //Nếu số lượng mua lớn hơn số lượng tồn
        if(bill.getStatus().equals("Paid")){
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_PAID));
        }else if (quantityAdd > productDetail.getQuantity() ) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
        }
        //Nếu tổng giá mua lớn hơn 10 triệu
        else if(price.multiply(BigDecimal.valueOf(quantityAdd)).compareTo(BigDecimal.valueOf(10000000))>0){
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_PRICE_THAN_FIVE_MILLION));
        }
        //Nếu nếu số lượng mua bé hơn hoặc bằng 0
        else if(quantityAdd <= 0){
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_QUANTITY_INVALID));
        }
        //Nếu giá mua cộng với giá tại hóa đơn lớn hơn 5 triệu
        else if(price.multiply(BigDecimal.valueOf(quantityAdd)).add(bill.getPriceReduce()).compareTo(BigDecimal.valueOf(10000000))>0){
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
        }
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
//    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public BillDetail createBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        //TODO: find billDetail with request.getBillDetailId() -> comparePrice == update quantity != createBillDetail
        BillDetail billDetail = BillDetail.builder().id(request.getBillDetailId())
                .bill(Bill.builder().id(request.getBillId()).build())
                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .status(Const.STATUS_ACTIVE)
                .build();
        Bill bill = billService.findBillByBillId(request.getBillId());
        BillDetail savedBillDetail = null;

        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        double priceInclude = CommonUtils.bigDecimalConvertDouble(request.getPrice());
        if (request.getQuantity() * priceInclude > 10000000) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
        }

        if (request.getBillDetailId() != null) {
            billDetail = billDetailRepo.findById(request.getBillDetailId()).orElse(null);

            if (Objects.isNull(billDetail)) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
            }

            ProductDetail productDetail = productDetailService.findById(request.getProductDetailId());
            if (billDetail.getQuantity() > request.getQuantity()) {
                productDetail.setQuantity(productDetail.getQuantity() +
                        (billDetail.getQuantity()) - request.getQuantity());
            }

            if (billDetail.getQuantity() < request.getQuantity()) {
                productDetail.setQuantity(productDetail.getQuantity() -
                        (request.getQuantity() - billDetail.getQuantity()));
            }

            if (productDetail.getQuantity() < 0) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
            }

            productDetailService.update(productDetail);
            billDetail.setQuantity(request.getQuantity());
            savedBillDetail = billDetailRepo.save(billDetail);
        } else {
            List<BillDetail> existingBillDetail = billDetailRepo.findBillDetailByBill_Id(request.getBillId());
            if (existingBillDetail.isEmpty()) {
                savedBillDetail = billDetailRepo.save(billDetail);
            } else {
                boolean isCheck = Boolean.TRUE;
                for (BillDetail billDetailUpdate : existingBillDetail) {
                    if (Objects.equals(request.getProductDetailId(), billDetailUpdate.getProductDetail().getId())) {
                        ProductDetail productDetailDb = productDetailService.findById(billDetailUpdate.getProductDetail().getId());
                        if (productDetailDb.getQuantity() - request.getQuantity() < 0) {
                            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
                        }
                        productDetailDb.setQuantity(productDetailDb.getQuantity() - request.getQuantity());

                        if(productDetailDb.getQuantity() < 0) {
                            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
                        }

                        if (!Objects.equals(billDetailUpdate.getPrice(), request.getPrice())) {
                            BillDetail newBillDetail = new BillDetail();
                            newBillDetail.setQuantity(request.getQuantity());
                            newBillDetail.setPrice(request.getPrice());
                            newBillDetail.setBill(billDetailUpdate.getBill());
                            newBillDetail.setProductDetail(billDetail.getProductDetail());
                            newBillDetail.setStatus(Const.STATUS_ACTIVE);
                            savedBillDetail = billDetailRepo.save(newBillDetail);
                        } else {
                            billDetailUpdate.setQuantity(billDetailUpdate.getQuantity() + request.getQuantity());
                            billDetailUpdate.setPrice(request.getPrice());
                            savedBillDetail = billDetailRepo.save(billDetailUpdate);
                        }

                        productDetailService.update(productDetailDb);
                        isCheck = Boolean.FALSE;
                        break;
                    }
                }

                if (isCheck) {
                    ProductDetail productDetailDb = productDetailService.findById(request.getProductDetailId());
                    if (productDetailDb.getQuantity() - request.getQuantity() < 0) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
                    }
                    productDetailDb.setQuantity(productDetailDb.getQuantity() - request.getQuantity());

                    if(productDetailDb.getQuantity() < 0) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
                    }
                    productDetailService.update(productDetailDb);

                    savedBillDetail = billDetailRepo.save(billDetail);
                }
            }
        }
        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        double maxPriceBillInOnline = CommonUtils.bigDecimalConvertDouble(priceBill);

        if (maxPriceBillInOnline > 10000000 && "Online".equalsIgnoreCase(bill.getBillType())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
        }

        bill.setPrice(priceBill);
        billService.updateBill(bill);
        return savedBillDetail;
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
//    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public BillDetail updateBill(Long id, String status) {
        BillDetail billDetail = billDetailRepo.findById(id).orElse(null);
        if (billDetail == null) {
            throw new IllegalArgumentException("bill detail không tồn tại");
        }

        billDetail.setStatus(status);
        return billDetailRepo.save(billDetail);
    }

    @Override
//    @Transactional(rollbackOn = Exception.class)
    public BillDetail deleteBillDetail(Long billId, Long billDetailId) throws NotFoundException, JsonProcessingException {
        Bill bill = billService.findBillByBillId(billId);
        BillDetail billDetail = billDetailRepo.findById(billDetailId).orElse(null);

        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        Timeline timelineFromBillId = timeLineService.timelineFromBillId(bill.getId());
        if (!"wait_for_confirm".equalsIgnoreCase(bill.getStatus()) || !timelineFromBillId.getStatus().equalsIgnoreCase("1")) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_CANNOT_EDIT_WHEN_BILL_NOT_EQUAL_WAIT_FOR_CONFIRM));
        }

        if (Objects.isNull(billDetail)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        ProductDetail productDetail = productDetailService.findById(billDetail.getProductDetail().getId());
        Integer quantityUpdate = productDetail.getQuantity() + billDetail.getQuantity();
        productDetail.setQuantity(quantityUpdate);

        productDetailService.update(productDetail);
        billDetail.setStatus(Const.STATUS_INACTIVE);
        billDetailRepo.deleteById(billDetail.getId());

        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBill);
        billService.updateBill(bill);

        return billDetail;
    }

    @Transactional(rollbackOn = RuntimeException.class)
    @Override
    public BillDetail updateBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        ProductDetail productDetail = productDetailService.getOne(request.getProductDetailId());
        productDetail.setQuantity(productDetail.getQuantity() - request.getQuantity());
        productDetailService.update(productDetail);

        BillDetail billDetail = BillDetail.builder()
                .id(request.getBillDetailId())
                .bill(Bill.builder().id(request.getBillId()).build())
                .productDetail(productDetail)
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .status(Const.STATUS_ACTIVE)
                .build();
        billDetailRepo.save(billDetail);

        return billDetail;
    }

    @Override
    public BillDetail saveOrUpdate(BillDetail billDetail) {
        return billDetailRepo.save(billDetail);
    }

    @Override
    public void deleteBill(Long id) {
        billDetailRepo.deleteById(id);
    }

    @Override
    public PdfResponse pdfResponse(String billCode) throws NotFoundException {
        if (StringUtils.isBlank(billCode)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        Bill bill = billService.findBillByBillCode(billCode);
        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }
        BillInfoResponse response = timeLineService.getBillInfoByBillId(bill.getId());
        List<TimelineProductResponse> lstProductDT = billDetailRepo.lstProductDT(billCode);
        List<PaymentDetailResponse> lstPaymentDetail = paymentService.findPaymentDetailByBillId(bill.getId());
        DeliveryNoteResponse deliveryNote = deliveryNoteService.getOne(billCode);

        if (Objects.nonNull(deliveryNote)) {
            String[] city = deliveryNote.getCity().split("\\|");
            String[] district = deliveryNote.getDistrict().split("\\|");
            String[] ward = deliveryNote.getWard().split("\\|");

            deliveryNote.setCity(city[0]);
            deliveryNote.setDistrict(district[0]);
            deliveryNote.setWard(ward[0]);
        }
        String[] createdBy = bill.getCreatedBy().split("_");
        System.out.println("data: " + createdBy.length);
        PdfResponse pdfResponse = PdfResponse.builder()
                .billCode(billCode)
                .billUpdateBy(bill.getUpdatedBy())
                .billCreatedAt(response.getCreatedDate())
                .billCreatedBy(createdBy.length > 0 ? createdBy[0] : createdBy[1])
                .totalPrice(response.getTotalPrice())
                .shippingFee(response.getShipPrice())
                .amountPaid(response.getAmountPaid())
                .voucherPrice(response.getVoucherPrice())
                .priceReduce(response.getPriceReduce())
                .lstProductDetail(lstProductDT)
                .lstPaymentDetail(lstPaymentDetail)
                .deliveryNote(deliveryNote)
                .billType(bill.getBillType())
                .billStatus(bill.getStatus())
                .billSymbol(bill.getSymbol())
                .build();

        return pdfResponse;
    }

    @Override
    public List<BillDetail> findBillDetailByBillCode(String billCode) throws NotFoundException {
        if (billCode == null) {
            throw new NotFoundException(Const.CODE_NOT_FOUND);
        }
        return billDetailRepo.findBillDetailByBill_BillCode(billCode);
    }


}
