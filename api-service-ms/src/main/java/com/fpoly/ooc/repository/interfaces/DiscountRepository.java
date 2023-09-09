//package com.fpoly.ooc.repository.interfaces;
//
//<<<<<<< HEAD
////package com.fpoly.ooc.repository.interfaces;
////
////<<<<<<< HEAD:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/RoleRepository.java
////import com.fpoly.ooc.entity.Role;
////=======
////import com.fpoly.ooc.entity.Discount;
////>>>>>>> 17f1ec6be5fd5f9c5f124d2222227992bb6172b0:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/DiscountRepository.java
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.stereotype.Repository;
////
////@Repository
////<<<<<<< HEAD:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/RoleRepository.java
////public interface RoleRepository extends JpaRepository<Role, Long> {
////=======
////public interface DiscountRepository extends JpaRepository<Discount, Long> {
////>>>>>>> 17f1ec6be5fd5f9c5f124d2222227992bb6172b0:api-service-ms/src/main/java/com/fpoly/ooc/repository/interfaces/DiscountRepository.java
////}
//=======
//package com.fpoly.ooc.repository.interfaces;
//
//import com.fpoly.ooc.entity.Discount;
//import com.fpoly.ooc.responce.promition.DiscountResponse;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface DiscountRepository extends JpaRepository<Discount, Long> {
//
//    @Query("select new com.fpoly.ooc.responce.promition.DiscountResponse(" +
//            "discount.id, discount.discountCode, discount.discountName, discount.startDate, " +
//            "discount.endDate, discount.discountValue, discount.discountMaxValue, discount.discountMethod, " +
//            "discount.discountCondition) from Discount discount ")
//    List<DiscountResponse> findAllDiscount();
//
//    @Query("select new com.fpoly.ooc.responce.promition.DiscountResponse(" +
//            "discount.id, discount.discountCode, discount.discountName, discount.startDate, " +
//            "discount.endDate, discount.discountValue, discount.discountMaxValue, discount.discountMethod, " +
//            "discount.discountCondition) from Discount discount ")
//    Page<DiscountResponse> pageAllDiscount(Pageable pageable);
//
//}
//>>>>>>> test
