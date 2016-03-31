unhangout:
	ansible-playbook -i hosts.cfg unhangout.yml --ask-vault-pass
unhangout-app:
	ansible-playbook -i hosts.cfg unhangout.yml --ask-vault-pass --tags unhangout
