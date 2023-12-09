package com.fpoly.ooc.service.kafka.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.dto.TimelineBillDTO;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.BrandDAORepository;
import com.fpoly.ooc.repository.ButtonTypeDAORepository;
import com.fpoly.ooc.repository.CategoryDAORepository;
import com.fpoly.ooc.repository.CollarDAORepository;
import com.fpoly.ooc.repository.ColorDAORepository;
import com.fpoly.ooc.repository.FormDAORepository;
import com.fpoly.ooc.repository.MaterialDAORepository;
import com.fpoly.ooc.repository.PatternDAORepository;
import com.fpoly.ooc.repository.ProductDAORepositoryI;
import com.fpoly.ooc.repository.ProductDetailDAORepositoryI;
import com.fpoly.ooc.repository.ShirtTailTypeDAORepository;
import com.fpoly.ooc.repository.SizeDAORepository;
import com.fpoly.ooc.repository.SleeveDAORepository;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.request.productDetail.GetSizeAndColorRequest;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.productdetail.GetColorAndSizeAndQuantity;
import com.fpoly.ooc.responce.productdetail.ProductDetailShopResponse;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import com.fpoly.ooc.util.CommonUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class KafkaListenerService {

    private SimpMessagingTemplate template;
    private ObjectMapper objectMapper;
    private BrandDAORepository brandDAORepository;
    private ProductDAORepositoryI productDAORepositoryI;
    private CategoryDAORepository categoryDAORepository;
    private PatternDAORepository patternDAORepository;
    private FormDAORepository formDAORepository;
    private ButtonTypeDAORepository buttonTypeDAORepository;
    private CollarDAORepository collarDAORepository;
    private SleeveDAORepository sleeveDAORepository;
    private ShirtTailTypeDAORepository shirtTailTypeDAORepository;
    private MaterialDAORepository materialDAORepository;
    private SizeDAORepository sizeDAORepository;
    private ColorDAORepository colorDAORepository;
    private ProductDetailDAORepositoryI productDetailDAORepositoryI;
    private TimeLineRepo timeLineRepo;
    private BillRepo billRepo;
    private ProductImageServiceI productImageServiceI;
    private ProductDetailServiceI productDetailServiceI;
    private ColorServiceI colorServiceI;
    private SizeServiceI sizeServiceI;

    @KafkaListener(topics = Const.TOPIC_PRODUCT, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddProduct(String productJson) throws JsonProcessingException {
        Product product = null;
        if (StringUtils.isNotBlank(productJson)) {
            product = objectMapper.readValue(productJson, Product.class);
        }

        Product productDb = null;
        if(Objects.nonNull(product)) {
            productDb = productDAORepositoryI.save(product);
        }

        if(Objects.nonNull(productDb)) {
            String productsJson = objectMapper.writeValueAsString(productDAORepositoryI.findAll());
            template.convertAndSend("/topic/product-topic", productsJson);
            log.info("ProductJson: " + productsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_CATEGORY, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddCategory(String categoryJson) throws JsonProcessingException {
        Category category = null;
        if (StringUtils.isNotBlank(categoryJson)) {
            category = objectMapper.readValue(categoryJson, Category.class);
        }

        Category categoryDb = null;
        if(Objects.nonNull(category)) {
            categoryDb = categoryDAORepository.save(category);
        }

        if(Objects.nonNull(categoryDb)) {
            String categorysJson = objectMapper.writeValueAsString(categoryDAORepository.findAll());
            template.convertAndSend("/topic/category-topic", categorysJson);
            log.info("CategoryJson: " + categorysJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_BRAND, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddBrand(String brandJson) throws JsonProcessingException {
        Brand brand = null;
        if (StringUtils.isNotBlank(brandJson)) {
            brand = objectMapper.readValue(brandJson, Brand.class);
        }

        Brand brandDb = null;
        if(Objects.nonNull(brand)) {
            brandDb = brandDAORepository.save(brand);
        }

        if(Objects.nonNull(brandDb)) {
            String brandsJson = objectMapper.writeValueAsString(brandDAORepository.findAll());
            template.convertAndSend("/topic/brand-topic", brandsJson);
            log.info("BrandJson: " + brandsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_PATTERN, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddPattern(String patternJson) throws JsonProcessingException {
        Pattern pattern = null;
        if (StringUtils.isNotBlank(patternJson)) {
            pattern = objectMapper.readValue(patternJson, Pattern.class);
        }

        Pattern patternDb = null;
        if(Objects.nonNull(pattern)) {
            patternDb = patternDAORepository.save(pattern);
        }

        if(Objects.nonNull(patternDb)) {
            String patternsJson = objectMapper.writeValueAsString(patternDAORepository.findAll());
            template.convertAndSend("/topic/pattern-topic", patternsJson);
            log.info("PatternJson: " + patternsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_FORM, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddForm(String formJson) throws JsonProcessingException {
        Form form = null;
        if (StringUtils.isNotBlank(formJson)) {
            form = objectMapper.readValue(formJson, Form.class);
        }

        Form formDb = null;
        if(Objects.nonNull(form)) {
            formDb = formDAORepository.save(form);
        }

        if(Objects.nonNull(formDb)) {
            String formsJson = objectMapper.writeValueAsString(formDAORepository.findAll());
            template.convertAndSend("/topic/form-topic", formsJson);
            log.info("FormJson: " + formsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_BUTTON, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddButton(String buttonJson) throws JsonProcessingException {
        ButtonType button = null;
        if (StringUtils.isNotBlank(buttonJson)) {
            button = objectMapper.readValue(buttonJson, ButtonType.class);
        }

        ButtonType buttonDb = null;
        if(Objects.nonNull(button)) {
            buttonDb = buttonTypeDAORepository.save(button);
        }

        if(Objects.nonNull(buttonDb)) {
            String buttonsJson = objectMapper.writeValueAsString(buttonTypeDAORepository.findAll());
            template.convertAndSend("/topic/button-topic", buttonsJson);
            log.info("ButtonTypeJson: " + buttonsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_COLLAR, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddCollar(String collarJson) throws JsonProcessingException {
        CollarType collar = null;
        if (StringUtils.isNotBlank(collarJson)) {
            collar = objectMapper.readValue(collarJson, CollarType.class);
        }

        CollarType collarDb = null;
        if(Objects.nonNull(collar)) {
            collarDb = collarDAORepository.save(collar);
        }

        if(Objects.nonNull(collarDb)) {
            String collarsJson = objectMapper.writeValueAsString(collarDAORepository.findAll());
            template.convertAndSend("/topic/collar-topic", collarsJson);
            log.info("CollarTypeJson: " + collarsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_SLEEVE, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddSleeve(String sleeveJson) throws JsonProcessingException {
        SleeveType sleeveType = null;
        if (StringUtils.isNotBlank(sleeveJson)) {
            sleeveType = objectMapper.readValue(sleeveJson, SleeveType.class);
        }

        SleeveType sleeveTypeDb = null;
        if(Objects.nonNull(sleeveType)) {
            sleeveTypeDb = sleeveDAORepository.save(sleeveType);
        }

        if(Objects.nonNull(sleeveTypeDb)) {
            String sleeveTypesJson = objectMapper.writeValueAsString(sleeveDAORepository.findAll());
            template.convertAndSend("/topic/sleeveType-topic", sleeveTypesJson);
            log.info("SleeveTypeJson: " + sleeveTypesJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_SHIRT_TAILS, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddShirtTailsType(String shirtTailsType) throws JsonProcessingException {
        ShirtTailType shirtTail = null;
        if (StringUtils.isNotBlank(shirtTailsType)) {
            shirtTail = objectMapper.readValue(shirtTailsType, ShirtTailType.class);
        }

        ShirtTailType shirtTailDb = null;
        if(Objects.nonNull(shirtTail)) {
            shirtTailDb = shirtTailTypeDAORepository.save(shirtTail);
        }

        if(Objects.nonNull(shirtTailDb)) {
            String shirtTailsJson = objectMapper.writeValueAsString(shirtTailTypeDAORepository.findAll());
            template.convertAndSend("/topic/shirtTail-topic", shirtTailsJson);
            log.info("ShirtTailTypeJson: " + shirtTailsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_MATERIAL, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddMaterial(String materialJson) throws JsonProcessingException {
        Material material = null;
        if (StringUtils.isNotBlank(materialJson)) {
            material = objectMapper.readValue(materialJson, Material.class);
        }

        Material materialDb = null;
        if(Objects.nonNull(material)) {
            materialDb = materialDAORepository.save(material);
        }

        if(Objects.nonNull(materialDb)) {
            String materialsJson = objectMapper.writeValueAsString(materialDAORepository.findAll());
            template.convertAndSend("/topic/material-topic", materialsJson);
            log.info("MaterialJson: " + materialsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_SIZE, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddSize(String sizeJson) throws JsonProcessingException {
        Size size = null;
        if (StringUtils.isNotBlank(sizeJson)) {
            size = objectMapper.readValue(sizeJson, Size.class);
        }

        Size sizeDb = null;
        if(Objects.nonNull(size)) {
            sizeDb = sizeDAORepository.save(size);
        }

        if(Objects.nonNull(sizeDb)) {
            String sizesJson = objectMapper.writeValueAsString(sizeDAORepository.findAll());
            template.convertAndSend("/topic/size-topic", sizesJson);
            log.info("SizeJson: " + sizesJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_COLOR, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddColor(String colorJson) throws JsonProcessingException {
        Color color = null;
        if (StringUtils.isNotBlank(colorJson)) {
            color = objectMapper.readValue(colorJson, Color.class);
        }

        Color colorDb = null;
        if(Objects.nonNull(color)) {
            colorDb = colorDAORepository.save(color);
        }

        if(Objects.nonNull(colorDb)) {
            String colorsJson = objectMapper.writeValueAsString(colorDAORepository.findAll());
            template.convertAndSend("/topic/color-topic", colorsJson);
            log.info("ColorJson: " + colorsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_PRODUCT_DETAIL, groupId = Const.KAFKA_GROUP_ID)
    public void listenerAddProductDetail(String productDetailJson) throws JsonProcessingException {
        ProductDetail productDetail = null;
        if (StringUtils.isNotBlank(productDetailJson)) {
            productDetail = objectMapper.readValue(productDetailJson, ProductDetail.class);
        }


        if(Objects.nonNull(productDetail)) {
            ProductDetail productDetailDb = productDetailDAORepositoryI.save(productDetail);
            List<ProductDetailShopResponse> response = productDetailDAORepositoryI.findProductDetailShopResponse(productDetailDb.getProduct().getId(), productDetailDb.getBrand().getId(),
                    productDetailDb.getCategory().getId(),productDetailDb.getPattern().getId(), productDetailDb.getForm().getId(),
                    productDetailDb.getButton().getId(), productDetailDb.getMaterial().getId(), productDetailDb.getCollar().getId(), productDetailDb.getSleeve().getId(),
                    productDetailDb.getShirtTail().getId());
        List<Long> productDetailIds = response.stream().map(ProductDetailShopResponse::getProductDetailId).collect(Collectors.toList());
        List<ProductImageResponse> images = productImageServiceI.getProductImageByProductDetailIds(productDetailIds);

        if (CollectionUtils.isEmpty(response)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        GetSizeAndColorRequest request = new GetSizeAndColorRequest();
        request.setColorId(productDetailDb.getColor().getId());
        request.setSizeId(productDetailDb.getSize().getId());
        request.setProductId(productDetailDb.getProduct().getId());
        request.setProductDetailId(productDetailDb.getId());
        request.setBrandId(productDetailDb.getBrand().getId());
        request.setCategoryId(productDetailDb.getCategory().getId());
        request.setPatternId(productDetailDb.getPattern().getId());
        request.setFormId(productDetailDb.getForm().getId());
        request.setButtonId(productDetailDb.getButton().getId());
        request.setMaterialId(productDetailDb.getMaterial().getId());
        request.setCollarId(productDetailDb.getCollar().getId());
        request.setSleeveId(productDetailDb.getSleeve().getId());
        request.setShirtTailId(productDetailDb.getShirtTail().getId());

        List<GetColorAndSizeAndQuantity> colorAndSizeListByReq = productDetailDAORepositoryI.findColorAndSize(request.getProductId(), request.getBrandId(), request.getCategoryId(),
                request.getPatternId(), request.getFormId(), request.getButtonId(), request.getMaterialId(), request.getCollarId(), request.getSleeveId(),
                request.getShirtTailId(), request.getColorId(), request.getSizeId());

        GetColorAndSizeAndQuantity res = CommonUtils.getOneElementsInArrays(colorAndSizeListByReq);
        if(Objects.isNull(res)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        Optional<List<Color>> colors = colorServiceI.findColorsByProductId(request);
        Optional<List<Size>> sizes = sizeServiceI.findSizesByProductId(request);
        if(colors.isEmpty() || sizes.isEmpty()) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        List<Long> productDetailsId =
                productDetailDAORepositoryI.productDetailsId(request.getProductId(), request.getBrandId(), request.getCategoryId(), request.getPatternId(),
                        request.getFormId(), request.getButtonId(), request.getMaterialId(), request.getCollarId(), request.getSleeveId(),
                        request.getShirtTailId(), request.getColorId(), request.getSizeId());
        if(!CollectionUtils.isEmpty(productDetailsId)) {
            res.setProductDetailsId(productDetailsId);
        }
        res.setColors(colors.get());
        res.setSizes(sizes.get());


        ProductDetailShopResponse productDetailShopResponse = response.get(0);
        GetColorAndSizeAndQuantity colorAndSize = productDetailServiceI.getColorAndSize(request).orElseThrow();
        productDetailShopResponse.setColorAndSizeAndQuantity(colorAndSize);
        productDetailShopResponse.setImages(images);

        String productDetailsJson = objectMapper.writeValueAsString(productDetailShopResponse);
        String colorsAndSizes = objectMapper.writeValueAsString(res);
        String productDetailsShopJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getAllProductDetailShop(
                null, null, null, "", "", "", "", null,
                null, null, null));
        String bestSellingJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getProductDetailBestSelling());
        String newProductJson = objectMapper.writeValueAsString(productDetailDAORepositoryI.getNewProductDetail());
        template.convertAndSend("/topic/getOneProductDetail-topic", productDetailsJson);
        template.convertAndSend("/topic/colorsAndSizes-topic", colorsAndSizes);
        template.convertAndSend("/topic/productDetailShop-topic", productDetailsShopJson);
        template.convertAndSend("/topic/bestSellingProduct-topic", bestSellingJson);
        template.convertAndSend("/topic/newProduct-topic", newProductJson);
        log.info("ProductDetailJson: " + productDetailsJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_TIME_LINE, groupId = Const.KAFKA_GROUP_ID)
    public void listenerTimeline(String billJson) throws JsonProcessingException {
        BillStatusDTO bill = null;
        if (StringUtils.isNotBlank(billJson)) {
            bill = objectMapper.readValue(billJson, BillStatusDTO.class);
        }

        Bill billDb = null;
        if(Objects.nonNull(bill)) {
            Bill billReq = new Bill();
            billReq.setId(bill.getId());
            billReq.setAmountPaid(bill.getAmountPaid());
            billReq.setStatus(bill.getStatus());
            billDb = billRepo.save(billReq);
        }

        if(Objects.nonNull(billDb)) {
            String updateStatusBillJson = objectMapper.writeValueAsString(timeLineRepo.findAll());
            String timeLineJson = objectMapper.writeValueAsString(timeLineRepo.findAll());
            String billClient = objectMapper.writeValueAsString(timeLineRepo.getTimeLineByBillId(bill.getId()));
            template.convertAndSend("/topic/bill-topic", updateStatusBillJson);
            template.convertAndSend("/topic/timeline-client-topic", billClient);
            log.info("TimeLineJson: " + timeLineJson);
        }
    }

    @KafkaListener(topics = Const.TOPIC_CREATE_BILL, groupId = Const.KAFKA_GROUP_ID)
    public void listenerCreateBill(String billJson) throws JsonProcessingException {
        Bill bill = null;
        if (StringUtils.isNotBlank(billJson)) {
            bill = objectMapper.readValue(billJson, Bill.class);
        }

        Bill billDb = null;
        if(Objects.nonNull(bill)) {
            billDb = billRepo.save(bill);
        }

        if(Objects.nonNull(billDb)) {
            String createBill = objectMapper.writeValueAsString(billRepo.getAllBillManagement(null, null,
                    null, null, null, null, null, null));
            template.convertAndSend("/topic/new-bill-topic", createBill);
            log.info("TimeLineJson: " + createBill);
        }
    }

//    @KafkaListener(topics = Const.TOPIC_CREATE_TIME_LINE, groupId = Const.KAFKA_GROUP_ID)
//    public void listenerCreateTimeline(String createTimelineJson) throws JsonProcessingException {
//        TimelineBillDTO timelineBillDTO = null;
//        if (StringUtils.isNotBlank(createTimelineJson)) {
//            timelineBillDTO = objectMapper.readValue(createTimelineJson, TimelineBillDTO.class);
//        }
//        log.error("CreateTimeLineJson: " + createTimelineJson);
//
//        Timeline timelineDb = null;
//        if(Objects.nonNull(timelineBillDTO)) {
//            timelineDb = timeLineRepo.save(timeline);
//        }
//
//        if(Objects.nonNull(timelineDb)) {
//            String timelineJson = objectMapper.writeValueAsString(timeLineRepo.getTimeLineByBillId(timelineDb.getBill().getId()));
//            template.convertAndSend("/topic/create-timeline-client-topic", timelineJson);
//            log.info("CreateTimeLineJson: " + timelineJson);
//        }
//    }
}
