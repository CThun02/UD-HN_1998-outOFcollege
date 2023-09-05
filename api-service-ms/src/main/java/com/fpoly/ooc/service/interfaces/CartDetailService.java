package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.responce.CartResponse;
import org.springframework.data.domain.Page;

public interface CartDetailService {

    Page<CartResponse> getAll(Integer pageNo, Integer size);

    CartDetail createCartDetail(CartRequest request);

    CartDetail updateCartDetail(Long id, CartRequest request);

    void deleteCartDetail(Long id);

}
