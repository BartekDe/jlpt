package pl.jlpt.jlptapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequestDto implements Serializable {

    private static final long serialVersionUID = 42L;

    private String username;
    private String password;

}
