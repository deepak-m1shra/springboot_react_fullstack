package com.deepak.springbootlibrary.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;

public class TestUtil {
    public static void main(String[] args) throws JsonProcessingException {
        String token = "Bearer eyJraWQiOiJYWWRXRkNJZTJlLTJadmJGa3pBU0t6Q2VJdk9nTnByLWwwYmE4bzdnTmtvIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlBmMXFPMEFSUUthNXhrelVHd2JpU0VQTnlJX3J6MHdKRHk1d2VsUFlJNWciLCJpc3MiOiJodHRwczovL2Rldi00NDgwNzgxNy5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2OTU5MTkxNzQsImV4cCI6MTY5NTkyMjc3NCwiY2lkIjoiMG9hYmxxam02YUJ0eWV1M201ZDciLCJ1aWQiOiIwMHVibHJvYmwxUWJQODFxZTVkNyIsInNjcCI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNjk1OTE5MTcxLCJzdWIiOiJ0ZXN0aW5nQGVtYWlsLmNvbSJ9.QOKYxMzmOoy6blxL6o9rfCIGJvVOb19Q8pdd6FxvuEPfGxFOjrAwM1MLe2lZdq7Q35gugj4_tj_h2hySmyrsrM-P8UrkN6tR7xcJXk7pevUl2C0iYRGQygViOavymKr7OA671ksYciBhLqhpZtyO9nfGAA1nGQ2yAHBWHRJDB93f0n36FrGLhm9Q0tFR5slEfYZq0BfzhpGW812tiYrDxzGvg9b-ZhLpTVEi20CzXfoGwcJPn15ph_nT1HqC-_-ttF95gt1hpjpa1h1L7cWJj15iFme5OX-GjhS-eBgvBSMVOQw2ScFAtHI5-7E1vhaBqyKBpudyhRTGZ27N5V_vVw";
        token.replace("Bearer", "");
        String[] chunks = token.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));

        System.out.println(payload);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode parent = mapper.readTree(payload);
        String content = parent.path("sub").asText();
        System.out.println(content);


    }
}
