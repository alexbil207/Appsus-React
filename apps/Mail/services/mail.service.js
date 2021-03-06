'use strict';
import { storageService } from '../../../services/storage-service.js';
import { utilService } from '../../../services/util-service.js';
import { mailDataService } from './mail.data.service.js';

export const mailService = {
    createMails,
    query,
    removeMail,
    mailUpdate,
    getMailById,
    createReplays

}

const KEY = 'mails';


function query(filterBy) {
    const mails = storageService.loadFromStorage(KEY);
    if (!mails) {
        _saveToStorage()
        return Promise.resolve(getfilterBy(filterBy))
    }
    return Promise.resolve(getfilterBy(filterBy));
}

function getfilterBy(filterBy) {
    const mails = storageService.loadFromStorage(KEY)
    let filteredMailes;
    const { category, text } = filterBy;
    if (category) {
        switch (category) {
            case 'isSend':
                filteredMailes = mails.filter(mail => mail[category] === true);
                break;
            case 'isFavorite':
                filteredMailes = mails.filter(mail => mail[category] === true);
                break;
            case 'isRead':
                filteredMailes = mails.filter(mail => mail[category] === false);
                break;
            case 'inbox':
                filteredMailes = mails.filter(mail => mail.isSend === false);
                break;
        }
        if (text) return Promise.resolve(filteredMailes.filter(mail => mail.subject.toLowerCase().includes(text)))
        else return Promise.resolve(filteredMailes);
    }
}

function createReplays(mailInfo) {
    const { mailId } = mailInfo;
    const mails = storageService.loadFromStorage(KEY);
    return getMailById(mailId, true).then(idx => {
        mails[idx].replies.unshift(_createReply(mailInfo))
        storageService.saveToStorage(KEY, mails)
        return Promise.resolve('done!');
    })
}

function createMails(mailInfo) {
    const mails = storageService.loadFromStorage(KEY);
    mails.unshift(_createMail(mailInfo));
    storageService.saveToStorage(KEY, mails)
    return Promise.resolve();
}

function getMailById(mailId, isIdx = false) {
    const mails = storageService.loadFromStorage(KEY);
    if (isIdx) return Promise.resolve(mails.findIndex(mail => mail.id === mailId))
    return Promise.resolve(mails.find(mail => mail.id === mailId))
}

function removeMail(mailId) {
    const mails = storageService.loadFromStorage(KEY);
    getMailById(mailId, true).then(idx => {
        mails.splice(idx, 1);
        storageService.saveToStorage(KEY, mails);
    })
    return Promise.resolve();
}

function mailUpdate(changeInfo) {
    const { mailId, field } = changeInfo;
    const mails = storageService.loadFromStorage(KEY);
    getMailById(mailId, true).then(idx => {
        mails[idx][field] = !mails[idx][field];
        storageService.saveToStorage(KEY, mails)
    })
}

function _createMail(mailInfo) {
    const { from, to, subject, body, isSend, isRead } = mailInfo;
    let { url } = mailInfo;
    if (!url) url = null;
    return {
        id: utilService.makeId(),
        subject,
        from,
        to,
        body,
        isRead,
        isFavorite: false,
        isSend,
        url,
        sentAt: Date.now(),
        reply: {
            from: '',
            body: '',
            sentAt: '',
        }
    }
}

function _createReply(mailInfo) {
    const { body } = mailInfo
    let { url } = mailInfo;
    if (!url) url = null;
    return {
        id: utilService.makeId(),
        from: 'alex207@gmail.com',
        body,
        url,
        sentAt: Date.now(),
    }
}
function _saveToStorage() {
    storageService.saveToStorage(KEY, mailDataService.gMails);
}






