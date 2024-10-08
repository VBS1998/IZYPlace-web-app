package main

import (
	"fmt"
	"log"
	"net/http"
)

var (
	addr = "localhost:8080"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("../frontend/out")))

	http.HandleFunc("/api/hello", hello)

	log.Printf("serving http://%s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

func hello(w http.ResponseWriter, r *http.Request) {

	response := "Hello World"
	fmt.Fprint(w, response)
}
