package mk.ukim.finki.finkiqa.model.facebook;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.finkiqa.model.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacebookUser extends User {
    private Long id;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    private String email;
    private FacebookPicture picture;
}
