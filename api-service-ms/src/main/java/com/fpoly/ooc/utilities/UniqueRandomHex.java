package com.fpoly.ooc.utilities;

import java.util.Random;

public class UniqueRandomHex {
    public static String generateUniqueRandomHex() {
        Random random = new Random();
        String hex = "";
        int randomNumber = random.nextInt(16777215);
        hex = String.format("#%06x", randomNumber);
        return hex;
    }
}
