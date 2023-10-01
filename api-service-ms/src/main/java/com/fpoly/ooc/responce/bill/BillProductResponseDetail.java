package com.fpoly.ooc.responce.bill;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class BillProductResponseDetail {

      private Long productDetailId;

      private List<Color> lstColor;

      private List<Size> lstSize;

}
