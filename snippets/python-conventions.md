# Python Conventions

## Virtual Environment Management
- **Primary**: Use `uv` to create virtual environments
- **Fallback**: Switch to regular `venv` if running into package difficulties

## Environment Activation
- **Always activate** the environment after creating it
- **Verify activation** before attempting to run scripts
- **First troubleshooting step**: Check if virtual environment is active when encountering package availability errors

## Best Practices
- Ensure environment is active before running any Python scripts
- If package errors occur, verify environment activation first
- Use uv unless specific compatibility issues arise
