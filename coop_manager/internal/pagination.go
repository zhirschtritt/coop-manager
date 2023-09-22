package coop_manager

import (
	"encoding/base64"
	"fmt"
	"strings"
)

type PaginationCodec struct {
	prefix    string
	delimiter string
}

func NewCodec(prefix string, delimiter string) *PaginationCodec {
	return &PaginationCodec{prefix, delimiter}
}

// Encode encodes multiple strings with a prefix into a single Base64 encoded string
func (pc *PaginationCodec) Encode(toEncode ...string) string {
	encodedWithPrefix := pc.prefix + strings.Join(toEncode, pc.delimiter)
	encoded := base64.StdEncoding.EncodeToString([]byte(encodedWithPrefix))

	return encoded
}

func (pc *PaginationCodec) Decode(toDecode string) ([]string, error) {
	decodedBytes, err := base64.StdEncoding.DecodeString(toDecode)
	if err != nil {
		return nil, fmt.Errorf("decoding cursor: %w", err)
	}
	decodedWithPrefix := string(decodedBytes)

	if hasPrefix := strings.HasPrefix(decodedWithPrefix, pc.prefix); !hasPrefix {
		return nil, fmt.Errorf(
			"cursor missing correct prefix: %s, instead got: %s", pc.prefix, decodedWithPrefix,
		)
	}

	decodedWithoutPrefix := strings.TrimPrefix(decodedWithPrefix, pc.prefix)

	decoded := strings.Split(decodedWithoutPrefix, pc.delimiter)

	return decoded, nil
}
