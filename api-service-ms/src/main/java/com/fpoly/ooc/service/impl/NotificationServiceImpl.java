package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.dto.NotificationDTO;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.NotificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private BillService billService;

    @Override
    public List<NotificationDTO> notificationDTOList() {
        List<NotificationDTO> notificationList = billService.findAllNotifications();
        if(CollectionUtils.isEmpty(notificationList)) {
            return null;
        }
        return notificationList;
    }
}
