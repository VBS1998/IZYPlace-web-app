package auth

import (
	"os"
)

const (
	DEFAULT_ADD_PWD = "D3f4ultP@55"
)

func Authorize(pwd string) bool {

	expectedPwd := os.Getenv("IZYPLACE_ADD_PWD")

	if expectedPwd == "" {
		expectedPwd = DEFAULT_ADD_PWD
	}

	return pwd == expectedPwd
}
