package server

import (
	"net/http"

	"github.com/VBS1998/base-web-app/src/auth"
)

func BaseApiConfiguration(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

func AnonymousMiddleware(next http.Handler) http.Handler {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		BaseApiConfiguration(w, r)
		next.ServeHTTP(w, r)
	})
	return handler
}

func AdminMiddleware(next http.Handler) http.Handler {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		BaseApiConfiguration(w, r)

		// Check auth
		pass := r.Header.Get("Authorization")
		if !auth.Authorize(pass) {
			http.Error(w, "", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
	return handler
}
