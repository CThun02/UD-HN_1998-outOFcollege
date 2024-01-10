package com.fpoly.ooc.request.timeline;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeLinerequest {

    private Long timelineId;

    private String note;

    private String status;

    private String createdBy;

    private Boolean paymentInDelivery;

}
