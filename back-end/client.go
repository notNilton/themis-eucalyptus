package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	distDir := "dist"

	fs := http.FileServer(http.Dir(distDir))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		filePath := filepath.Join(distDir, r.URL.Path)

		// Verifica se o arquivo existe
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			// Se não existir, serve o index.html (para suporte ao React Router)
			http.ServeFile(w, r, filepath.Join(distDir, "index.html"))
			return
		}

		fs.ServeHTTP(w, r)
	})

	fmt.Println("Serving 'dist' on http://localhost:8090")
	http.ListenAndServe(":8090", nil)
}
