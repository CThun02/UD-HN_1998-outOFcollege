package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.entity.VoucherHistory;

import java.math.BigDecimal;

public interface VoucherHistoryService {

    VoucherHistory save(VoucherHistorySaveDTO dto);

}
