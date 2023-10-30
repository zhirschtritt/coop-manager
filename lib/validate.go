package lib

import "github.com/go-playground/validator/v10"

// Create the Validate function once and reuse since it caches struct info on the instance
var Validate = validator.New()
