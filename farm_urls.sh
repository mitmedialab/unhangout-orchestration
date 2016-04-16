#!/bin/bash

set -e
set -x

# TODO: Generalize the location of the unhangout repo -- submodule?  but we need config..
cd ../unhangout/

for i in `seq 1 8` ; do 
    FARMING_SIGN_IN_URL="https://un${i}.unhangout.io/auth/google-alt" FARMING_SERVER_URL="https://un${i}.unhangout.io" bin/selenium-farmer.js
done
