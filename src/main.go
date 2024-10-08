package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

var (
	addr = "localhost:8080"
)

func main() {

	http.HandleFunc("/aa/", greet)

	log.Printf("serving http://%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func greet(w http.ResponseWriter, r *http.Request) {
	name := strings.Trim(r.URL.Path, "/")
	if name == "" {
		name = "Hello"
	}

	fmt.Printf("Hello %s\n", name)
}
