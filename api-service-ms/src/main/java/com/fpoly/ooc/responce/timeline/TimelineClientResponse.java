package com.fpoly.ooc.responce.timeline;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TimelineClientResponse {

    private List<TimeLineResponse> lstTimeline;

    private TimelineCustomInfo timelineCustomInfo;

    private List<TimelineProductDisplayResponse> lstProduct;

}
