.PHONY: test
test: prebuild ## Run angular tests
	@echo "+$@"
	@$(NPM) ci
	@$(NPM) run test:ci

.PHONY: cover
cover: prebuild ## Runs angular tests with coverage
	@echo "+$@"
	@$(NPM) ci 
	@$(NPM) run test:ci
	sed -i 

## This is where the location of the coverage is set I think.
## Need to make sure I have the correct format / location