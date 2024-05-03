#MSYS_NO_PATHCONV=1 disable git's default absolute path, just for this script in order to get the correct pwd (current working dir)
function generateAPI {
MSYS_NO_PATHCONV=1 \
docker run --rm -v "$(pwd):/local" openapitools/openapi-generator-cli generate \
    -i /local/openapi/tyb.openapi.yaml \
    -g typescript-axios \
    -o /local/src/services/api/openapicode_tyb_user --package-name tybuser
}

generateAPI
