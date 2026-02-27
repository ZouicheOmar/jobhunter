package com.jobhunter.backend.dto;

import java.util.Optional;

public record ResolvePostCandidDataRequest(
        String applicationHostname,
        PostCandidScrappedDataDto scrapped) {
}
