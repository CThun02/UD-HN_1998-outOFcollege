package com.fpoly.ooc.responce;

import com.fpoly.ooc.dto.NotificationDTO;
import lombok.Data;

import java.util.List;

@Data
public class NotificationResponse {
    private List<NotificationDTO> notificationList;
    private Boolean isReload;
}
