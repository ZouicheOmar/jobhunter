package com.jobhunter.backend.dto;

import java.util.Optional;

public record PostalAddressDto(
        Optional<String> addressCountry,
        Optional<String> addressLocality,
        Optional<String> addressRegion,
        Optional<String> streetAddress,
        Optional<String> postalCode) {
}
