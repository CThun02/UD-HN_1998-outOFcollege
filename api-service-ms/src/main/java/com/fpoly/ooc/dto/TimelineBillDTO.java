package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Timeline;
import lombok.Data;

@Data
public class TimelineBillDTO {
    private Long timelineId;
    private String note;
    private Long billId;

}
