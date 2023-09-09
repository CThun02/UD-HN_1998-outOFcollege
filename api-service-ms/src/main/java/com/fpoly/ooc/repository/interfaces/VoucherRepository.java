//<<<<<<< HEAD
////package com.fpoly.ooc.repository.interfaces;
////
////<<<<<<< HEAD:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/AddressDetailRepository.java
////import com.fpoly.ooc.entity.AddressDetail;
////=======
////import com.fpoly.ooc.entity.Voucher;
////>>>>>>> 17f1ec6be5fd5f9c5f124d2222227992bb6172b0:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/VoucherRepository.java
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.stereotype.Repository;
////
////@Repository
////<<<<<<< HEAD:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/AddressDetailRepository.java
////public interface AddressDetailRepository extends JpaRepository<AddressDetail, Long> {
////=======
////public interface VoucherRepository extends JpaRepository<Voucher, Long> {
////>>>>>>> 17f1ec6be5fd5f9c5f124d2222227992bb6172b0:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/VoucherRepository.java
////}
//=======
//package com.fpoly.ooc.repository.interfaces;
//
//import com.fpoly.ooc.entity.Voucher;
//import com.fpoly.ooc.responce.voucher.VoucherResponse;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface VoucherRepository extends JpaRepository<Voucher, Long> {
//
//    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(voucher.id, voucher.voucherCode, " +
//            "voucher.voucherName, voucher.startDate, voucher.endDate, voucher.voucherValue, " +
//            "voucher.voucherValueMax, voucher.voucherMethod, voucher.voucherCondition, " +
//            "voucher.limitQuantity, voucher.permission) from Voucher voucher " +
//            "where voucher.status = com.fpoly.ooc.constant.Const.VOUCHER_STATUS_ACTIVE")
//    List<VoucherResponse> findAllVoucher();
//
//    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(voucher.id, voucher.voucherCode, " +
//            "voucher.voucherName, voucher.startDate, voucher.endDate, voucher.voucherValue, " +
//            "voucher.voucherValueMax, voucher.voucherMethod, voucher.voucherCondition, " +
//            "voucher.limitQuantity, voucher.permission) from Voucher voucher " +
//            "where voucher.status = com.fpoly.ooc.constant.Const.VOUCHER_STATUS_ACTIVE")
//    Page<VoucherResponse> pageAllVoucher(Pageable pageable);
//
//}
//>>>>>>> test
