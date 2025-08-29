# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions of Exoole:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Exoole, please help us maintain the security of our users by reporting it responsibly. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing us directly at:

**Email:** hello@theaminul.com

Please include the following information in your report:

- **Type of issue** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the manifestation of the issue**
- **The location of the affected source code** (tag/branch/commit or direct URL)
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue**, including how an attacker might exploit the issue

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 72 hours.

2. **Initial Response**: We will provide an initial response within 7 business days indicating the next steps in handling your report.

3. **Investigation**: We will investigate the reported vulnerability and determine its validity and severity.

4. **Resolution Timeline**: 
   - **Critical vulnerabilities**: Patched within 7 days
   - **High severity vulnerabilities**: Patched within 14 days
   - **Medium/Low severity vulnerabilities**: Patched within 30 days

5. **Disclosure**: Once a fix is available, we will:
   - Release a security update
   - Publicly disclose the vulnerability details
   - Credit you for the discovery (unless you prefer to remain anonymous)

## Security Considerations for Exoole

As a WordPress page builder plugin that integrates with Gutenberg, Exoole handles various types of user input and content. Here are key security areas we focus on:

### Content Security
- **Input Sanitization**: All user inputs are properly sanitized and validated
- **Output Escaping**: All output is properly escaped to prevent XSS attacks
- **HTML Filtering**: Custom HTML content is filtered through WordPress's allowed HTML functions

### Block Security
- **Block Validation**: All custom blocks undergo security validation
- **Attribute Sanitization**: Block attributes are properly sanitized
- **Capability Checks**: Proper capability checks are implemented for block operations

### Authentication & Authorization
- **WordPress Integration**: Full integration with WordPress user roles and capabilities
- **Nonce Verification**: All forms and AJAX requests use WordPress nonces
- **Permission Checks**: Proper permission checks for all administrative functions

## Security Best Practices for Users

To help keep your WordPress site secure when using Exoole:

1. **Keep Updated**: Always use the latest version of Exoole
2. **WordPress Updates**: Keep WordPress core updated to the latest version
3. **User Permissions**: Only grant page building permissions to trusted users
4. **Regular Backups**: Maintain regular backups of your website
5. **Security Monitoring**: Use security monitoring plugins alongside Exoole
6. **File Permissions**: Ensure proper file permissions on your WordPress installation

## Security Features

Exoole includes several built-in security features:

- **WordPress Standards Compliance**: Built following WordPress security best practices
- **Capability-Based Access**: Respects WordPress user roles and capabilities
- **Nonce Protection**: All forms and AJAX requests are protected with nonces
- **Data Sanitization**: All user inputs are sanitized using WordPress functions
- **Content Filtering**: Custom content is filtered through WordPress security filters
- **Escape Output**: All output is properly escaped to prevent XSS

## Vulnerability Disclosure Policy

We follow responsible disclosure principles:

1. **Coordinated Disclosure**: We work with researchers to coordinate disclosure timing
2. **User Protection**: Priority is given to protecting users before public disclosure
3. **Transparency**: We provide clear information about vulnerabilities once resolved
4. **Credit**: We acknowledge security researchers who help improve Exoole's security

## Security Contact

For security-related questions or concerns:

- **Email**: hello@theaminul.com
- **Subject Line**: Please use "Exoole Security" in the subject line

## Hall of Fame

We acknowledge and thank the following security researchers who have helped improve Exoole's security:

*This section will be updated as we receive and resolve security reports.*

---

Thank you for helping keep Exoole and our community safe!