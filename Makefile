ifdef vault_password_file
	VAULT = --vault-password-file $(vault_password_file)
else
	VAULT = --ask-vault-pass
endif
ifdef tags
	TAGS = --tags $(tags)
endif
PLAYBOOK = ansible-playbook -i hosts.cfg $(VAULT) $(TAGS)

unhangout:
	$(PLAYBOOK) unhangout.yml

loadtester:
	$(PLAYBOOK) loadtester.yml
loadtester-stop:
	$(PLAYBOOK) loadtester-stop.yml
loadtester-start:
	$(PLAYBOOK) loadtester-start.yml

balancer:
	$(PLAYBOOK) balancer.yml
