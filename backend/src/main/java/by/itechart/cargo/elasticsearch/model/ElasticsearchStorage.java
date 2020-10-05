package by.itechart.cargo.elasticsearch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "storage")
public class ElasticsearchStorage {

    @Id
    Long id;

    @Field(type = FieldType.Text)
    String country;

    @Field(type = FieldType.Text)
    String city;

    @Field(type = FieldType.Text)
    String street;

    @Field(type = FieldType.Text)
    String email;

    @Field(type = FieldType.Text)
    String phone;

    @Field(type = FieldType.Long)
    Long clientCompanyId;
}
