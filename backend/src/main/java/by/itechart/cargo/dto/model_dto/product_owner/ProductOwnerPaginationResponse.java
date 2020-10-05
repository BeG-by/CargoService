package by.itechart.cargo.dto.model_dto.product_owner;

import by.itechart.cargo.model.ProductOwner;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductOwnerPaginationResponse {
    Long totalAmountProductOwners;
    List<ProductOwner> productOwners;
}
