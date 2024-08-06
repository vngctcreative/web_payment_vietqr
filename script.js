document.addEventListener('DOMContentLoaded', function() {
    // Thêm lớp 'show' vào container khi DOM đã tải xong
    document.querySelector('.container').classList.add('show');
});

function toggleOptionalFields() {
    const includeAmount = document.getElementById('includeAmount').checked;
    const includeContent = document.getElementById('includeContent').checked;

    const optionalFields = document.getElementById('optionalFields');
    const amountField = document.getElementById('amountField');
    const contentField = document.getElementById('contentField');
    
    if (includeAmount || includeContent) {
        optionalFields.classList.add('visible');
    } else {
        optionalFields.classList.remove('visible');
    }

    if (includeAmount) {
        amountField.style.display = 'block';
    } else {
        amountField.style.display = 'none';
    }

    if (includeContent) {
        contentField.style.display = 'block';
    } else {
        contentField.style.display = 'none';
    }
}

document.getElementById('includeAmount').addEventListener('change', toggleOptionalFields);
document.getElementById('includeContent').addEventListener('change', toggleOptionalFields);

function generateQR() {
    const bankCode = document.getElementById('bankCode').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;
    const content = document.getElementById('content').value;
    const accountName = document.getElementById('accountName').value;
    const format = document.getElementById('format').value;

    if (!bankCode || !accountNumber || !accountName || !format) {
        alert("Vui lòng điền đầy đủ thông tin trước khi Tạo mã QR !!!");
        return;
    }

    const sanitizedNote = sanitizeString(content);
    const sanitizedAccountName = sanitizeString(accountName);

    const vietQRUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-${format}.png?amount=${amount || 0}&addInfo=${encodeURIComponent(sanitizedNote)}&accountName=${encodeURIComponent(sanitizedAccountName)}`;

    document.getElementById('qrImage').src = vietQRUrl;
    document.getElementById('qrPopup').style.display = 'flex';
}

function sanitizeString(str) {
    return str.replace(/[^a-z0-9 ,.?!]/ig, '');
}

function closePopup() {
    document.getElementById('qrPopup').style.display = 'none';
}