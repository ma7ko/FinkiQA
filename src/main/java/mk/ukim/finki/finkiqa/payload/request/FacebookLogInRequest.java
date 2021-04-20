package mk.ukim.finki.finkiqa.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FacebookLogInRequest implements Serializable {

    @NotBlank
    private String accessToken;
}
