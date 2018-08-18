function PasswordGenerator() {
    this.constant = {
        mustHaveLowercase : true,
        mustHaveUppercase : true,
        mustHaveDigit : true,
        mustHaveNonAlphaNumeric : true,
        minLength : 3,
        maxLength : 3,
        excludedCharacters : ""
    }

    var lowerCase = "", upperCase = "", digits = "", nonAlphaNumeric = "", allCharacters = "";
    var excludedCharacters = "";

    // Configs Default
    var mustHaveLowercase = this.constant.mustHaveLowercase;
    var mustHaveUppercase = this.constant.mustHaveUppercase;
    var mustHaveDigit = this.constant.mustHaveDigit;
    var mustHaveNonAlphaNumeric = this.constant.mustHaveNonAlphaNumeric;
    var minLength = this.constant.minLength;
    var maxLength = this.constant.maxLength;
    var excludedCharacters = this.constant.excludedCharacters;

    String.prototype.shuffle = function () {
        var a = this.split(""),
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    function initCharacterSet() {
        for (var i = 1 + 32; i <= 94 + 32; i++) {
            var c = String.fromCharCode(i);

            //Check is this character excluded
            var isIgnored = false;
            for (var j = 0; j < excludedCharacters.length; j++) {
                if (c == excludedCharacters.charAt(j)) {
                    isIgnored = true;
                    break;
                }
            }

            //if this character is not excluded then put it varo the specific character set variable
            if (!isIgnored) {
                //put digits (0-9) varo the set of digit
                if (16 + 32 <= i && i <= 25 + 32) {
                    digits += c;
                }
                //put upper case characters (A-Z) varo the set of uppercase characters
                if (33 + 32 <= i && i <= 58 + 32) {
                    upperCase += c;
                }
                //put lower case characters (a-z) varo the set of lowercase characters
                if (65 + 32 <= i && i <= 90 + 32) {
                    lowerCase += c;
                }
                //put nonalphanumeric characters varo the set of nonalphanumeric characters
                if ((1 + 32 <= i && i <= 15 + 32) || (26 + 32 <= i && i <= 32 + 32) || (59 + 32 <= i && i <= 64 + 32) || (91 + 32 <= i && i <= 94 + 32)) {
                    nonAlphaNumeric += c;
                }
            }
        }

        //marge all valid characters and put varo the set of all valid characters
        allCharacters = digits + lowerCase + upperCase + nonAlphaNumeric;
    }

    this.getConfigs = function() {
        return {
            mustHaveLowercase : mustHaveLowercase,
            mustHaveUppercase : mustHaveUppercase,
            mustHaveDigit : mustHaveDigit,
            mustHaveNonAlphaNumeric : mustHaveNonAlphaNumeric,
            minLength : minLength,
            maxLength : maxLength,
            excludedCharacters : excludedCharacters
        }
    }

    var setConfigs = function(configs) {
        mustHaveLowercase = configs.mustHaveLowercase;
        mustHaveUppercase = configs.mustHaveUppercase;
        mustHaveDigit = configs.mustHaveDigit;
        mustHaveNonAlphaNumeric = configs.mustHaveNonAlphaNumeric;
        minLength = parseInt(configs.minLength);
        maxLength = parseInt(configs.maxLength);
        excludedCharacters = configs.excludedCharacters;
    }


    function generateRandomPassword() {
        var rp = null; // Random Password
        // Your code to set rp appropriately goes here
        //handle incompatible value of minLength and maxLength
        if (maxLength < minLength) {
            return null;
        }
        //########################################### Step 3 : generate password length ##########################################################
        //initialize default password length as 10
        var passwordLength = 10;

        //count how many conditions will be applied
        var conditionNumber = 0;
        if (mustHaveLowercase) {
            conditionNumber++;
        }
        if (mustHaveUppercase) {
            conditionNumber++;
        }
        if (mustHaveDigit) {
            conditionNumber++;
        }
        if (mustHaveNonAlphaNumeric) {
            conditionNumber++;
        }
        // return null when maxLength is less than conditionNumber
        if(maxLength<conditionNumber)
            return null;
        //update minLength when number of conditions is greater then minLength
        if (minLength < conditionNumber) {
            minLength = conditionNumber;
        }

        //generate random password length within minLength and maxLength if default password length 10 is not valid for range
        if (10 < minLength || maxLength < 10) {
            passwordLength = minLength + Math.floor((Math.random() * (maxLength - minLength)));
        }

        //######################################################################################################################################

        //######################################## Step 4 : Choose random valid characters #####################################################
        var currentPasswordLength = 0;
        var index;                      //to hold random index of the specific character set
        rp = "";                        //Initialize random password

        //add a lowercase character into the random password rp
        if (mustHaveLowercase) {
            index = Math.floor((Math.random() * lowerCase.length) + 1);
            rp += lowerCase.charAt(index);
            currentPasswordLength++;
        }
        //add a upper case character into the random password rp
        if (mustHaveUppercase) {
            index = Math.floor((Math.random() * upperCase.length) + 1);
            rp += upperCase.charAt(index);
            currentPasswordLength++;
        }
        //add a digit into the random password rp
        if (mustHaveDigit) {
            index = Math.floor((Math.random() * digits.length) + 1);
            rp += digits.charAt(index);
            currentPasswordLength++;
        }
        //add a nonalphanumeric character in to the random password rp
        if (mustHaveNonAlphaNumeric) {
            index = Math.floor((Math.random() * nonAlphaNumeric.length) + 1);
            rp += nonAlphaNumeric.charAt(index);
            currentPasswordLength++;
        }
        //now add rest of the valid characters in to the random password rp
        for (var i = currentPasswordLength; i < passwordLength; i++) {
            index = Math.floor((Math.random() * allCharacters.length) + 1);
            rp += allCharacters.charAt(index);
        }
        //#######################################################################################################################################

        //############################################## Step 5 : Shuffle the random characters ##############################################################
        //now shuffle all characters in the random password
        /*
         *  1. put all characters in to the Character Arraylist
         *  2. using the shuffle() method of Collection shuffle the characters
         *  3. put the shuffled characters into the variable rp
         */
        // ArrayList<Character> characters = new ArrayList<Character>();
        // for (int i = 0; i < rp.length(); i++) {
        //     characters.add(rp.charAt(i));
        // }
        // Collections.shuffle(characters);
        // //reinitialize the random password variable rp
        // rp = "";
        // for (int i = 0; i < characters.size(); i++) {
        //     rp += characters.get(i);
        // }
        //#####################################################################################################################################
        return rp.shuffle();
    }


    this.generate = function(configs) {
        setConfigs(configs);
        initCharacterSet();
        return generateRandomPassword();
    }
}