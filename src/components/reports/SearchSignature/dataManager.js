export const constants = {
    attackType: [
        { value: 1, label: 'URL Access Violation' },
        { value: 2, label: 'LDAP Injection' },
        { value: 3, label: 'Cross Site Scripting' },
        { value: 4, label: 'SSI Injection' },
        { value: 5, label: 'Path Traversal' },
        { value: 6, label: 'Hot Link' },
        { value: 7, label: 'Folder Access Violation' },
        { value: 8, label: 'Security Misconfiguration' },
        { value: 9, label: 'Invalid Client Certificate Attributes' },
        { value: 10, label: 'Server Information Leakage' },
        { value: 11, label: 'HTTP Request Header Size Violation' },
        { value: 12, label: 'Revoked Client Certificate Request' },
        { value: 13, label: 'Access from Unauthorized source IP' },
        { value: 14, label: 'HTTP Method Violation' },
        { value: 15, label: 'Credit Card Number Leakage' },
        { value: 16, label: 'Social Security Number Leakage' },
        { value: 17, label: 'Other Pattern Leakage' },
        { value: 18, label: 'Cookie Poisoning' },
        { value: 19, label: 'Session Fixation' },
        { value: 20, label: 'Server Misconfiguration' },
        { value: 21, label: 'File Upload Violation' },
        { value: 22, label: 'Evasion' },
        { value: 23, label: 'Web Services Abuse' },
        { value: 24, label: 'Non-Valid XML Structure' },
        { value: 25, label: 'Null Byte Injection' },
        { value: 26, label: 'Remote File Inclusion' },
        { value: 27, label: 'XPath Injection' },
        { value: 28, label: 'High Resource Utilization' },
        { value: 29, label: 'Buffer Overflow' },
        { value: 30, label: 'Abuse of Functionality' },
        { value: 31, label: 'Application Misconfiguration' },
        { value: 32, label: 'Mail Command Injection' },
        { value: 33, label: 'Fingerprinting' },
        { value: 34, label: 'Input Validation Violation' },
        { value: 35, label: 'Application Information Leakage' },
        { value: 36, label: 'Web Worms' },
        { value: 37, label: 'Directory Indexing' },
        { value: 38, label: 'Predictable Resource Location' },
        { value: 39, label: 'Unauthorized Access Attempt' },
        { value: 40, label: 'Session Flow Violation' },
        { value: 41, label: 'Cross Site Request Forgery' },
        { value: 42, label: 'Unauthorized access attempt' },
        { value: 43, label: 'Wrong Username Password Authentication' },
        { value: 44, label: 'Authentication Event' },
        { value: 45, label: 'Israeli ID Leakage' }
    ],
    status: [
        { value: 'in_progress', label: 'In progress' },
        { value: 'in_test', label: 'In test' },
        { value: 'in_qA', label: 'In QA' },
        { value: 'published', label: 'Published' },
        { value: 'Suspended', label: 'Suspended' }],
    reference: [{ id: 1, name: 'CveId' }, { id: 2, name: 'BugTracId' }, { id: 3, name: 'Other' }]
}

