package by.itechart.cargo.elasticsearch.model;


import by.itechart.cargo.model.ProductOwner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "product_owner")
public class ElasticsearchProductOwner {

    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Long)
    private Long clientCompanyId;

    public static ElasticsearchProductOwner fromProductOwner(ProductOwner productOwner) {
        return new ElasticsearchProductOwner(
                productOwner.getId(),
                productOwner.getName(),
                productOwner.getClientCompany().getId());
    }
}
