package com.fpoly.ooc.responce.pdf;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class PdfResponse {

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime BillCreatedAt;

    private String billCode;

    private String billCreatedBy;

    private BigDecimal totalPrice;

    private BigDecimal shippingFee;

    private BigDecimal amountPaid;

    private List<TimelineProductResponse> lstProductDetail;

}
