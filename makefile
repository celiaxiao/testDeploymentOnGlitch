sync:
	cp -r ../cse110-fa21-group31/source source
	cp ../cse110-fa21-group31/index.html index.html

update:
	git add .
	git commit -m "syncing with main"
	git push origin master