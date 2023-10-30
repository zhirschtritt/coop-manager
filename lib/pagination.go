package lib

import (
	"encoding/base64"
	"errors"
	"strings"

	"github.com/samber/lo"
)

type PaginationMeta struct {
	NextPageCursor *string `json:"nextPageCursor"`
}

type CursorSingleContext struct {
	Name  string
	Value string
}

type CursorCodec struct {
	Name         string
	Delimiter    string
	ContextNames []string
}

func MustNewCursorCodec(name string, contextNames []string, delimiter string) CursorCodec {
	if (name == "") || (delimiter == "") || (len(contextNames) == 0) {
		panic("name, delimiter, and contextNames must be provided")
	}

	return CursorCodec{
		Name:         name,
		Delimiter:    delimiter,
		ContextNames: contextNames,
	}
}

func (c CursorCodec) Encode(cursorContext []CursorSingleContext) (string, error) {
	// confirm the context matches the order of the codec context names
	for i, context := range cursorContext {
		if context.Name != c.ContextNames[i] {
			return "", errors.New("context does not match codec properties")
		}
	}

	allValues := lo.Map(cursorContext, func(context CursorSingleContext, _ int) string {
		return context.Value
	})
	rawString := strings.Join(allValues, c.Delimiter)

	return base64.StdEncoding.EncodeToString([]byte(rawString)), nil
}

func (c CursorCodec) Decode(cursor string) (map[string]string, error) {
	decoded, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return nil, errors.New("decoding cursor")
	}

	rawString := string(decoded)
	rawValues := strings.Split(rawString, c.Delimiter)

	if len(rawValues) != len(c.ContextNames) {
		return nil, errors.New("cursor does not match context")
	}

	cursorContext := make(map[string]string)
	for i, rawValue := range rawValues {
		cursorContext[c.ContextNames[i]] = rawValue
	}

	return cursorContext, nil
}
