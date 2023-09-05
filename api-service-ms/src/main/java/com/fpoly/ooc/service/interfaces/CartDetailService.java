package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.responce.CartResponse;
import org.springframework.data.domain.Page;

public interface CartDetailService {

    Page<CartResponse> getAll();

    CartDetail createCartDetail(CartRequest request);

}
