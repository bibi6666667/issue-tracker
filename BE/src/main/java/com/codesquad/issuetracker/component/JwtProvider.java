package com.codesquad.issuetracker.component;

import com.codesquad.issuetracker.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.lang.Maps;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
public class JwtProvider {

    private static final String USER_CLAIM_KEY = "user";

    private final long validityInMilliseconds;
    private final String secretKey;

    public JwtProvider(@Value("&{security.jwt.token.secret-key}") String secretKey,
                       @Value("${security.jwt.token.expire-length}") long validityInMilliseconds) {
        this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        this.validityInMilliseconds = validityInMilliseconds;
    }

    public String createJwt(User user) {
        Claims claims = Jwts.claims()
                .setSubject(user.getLoginId());

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds); // 유효시간 (지금 + 유효기간)
        log.info("now: {}", now);
        log.info("validity: {}", validity);

        return Jwts.builder()
                .setClaims(claims)
                .claim(USER_CLAIM_KEY, user)
                .serializeToJsonWith(new JacksonSerializer(new ObjectMapper()))
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public User getUser(String token) {
        return getClaims(token)
                .get(USER_CLAIM_KEY, User.class);
    }

    public boolean validateToken(String token) {
        return !getClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .deserializeJsonWith(
                        new JacksonDeserializer(Maps.of(USER_CLAIM_KEY, User.class).build())
                )
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
