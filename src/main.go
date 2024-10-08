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

	http.HandleFunc("/", hello)

	log.Printf("serving http://%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func hello(w http.ResponseWriter, r *http.Request) {
	name := strings.Trim(r.URL.Path, "/")
	if name == "" {
		name = "Hello"
	}

	response := "Hello " + name
	fmt.Fprint(w, response)
}
