import fetcher from '../fetcher';

const updateQaDashboard = async (signatureIds) => {
    try {
        const { data } = await fetcher.put('/Qa/dashboard', JSON.parse(signatureIds))
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getQaDashboard = async () => {
    try {
        const { data } = await fetcher.get('/Qa/dashboard')
        return data;
    } catch (error) {
        throw error.message;
    }
}

const searchSignature = async (url) => {
    try {
        const { data } = await fetcher.get(url)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const copySignature = async (id) => {
    try {
        const newID = await fetcher.post(`/signature/copy/${id}`)
        return newID;
    } catch (error) {
        throw error.message;
    }
}

const getExportSignatures = async (url) => {
    try {
        const { data } = await fetcher.get(url)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const exportSignaturesTofile = async (exportType, data2) => {
    try {
        const url = `/signature/export/${exportType}`;
        const { data } = exportType.includes('exportTo') ? await fetcher.get(url) : await fetcher.post(url, data2)
        const response = data
        var fileURL = window.URL.createObjectURL(new Blob([response]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', `file.${exportType.slice(0, 4) == 'text' ? 'txt' : 'xml'}`);
        document.body.appendChild(fileLink);
        fileLink.click();
        return data;
    } catch (error) {
        throw error.message;
    }
}

const exportAllSignaturesTofile = async (url) => {
    try {
        const { data } = await fetcher.get(url);
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getSignatures = async (url) => {
    try {
        const { data } = await fetcher.get(url)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getResearcher = async (requestURL) => {
    try {
        const { data } = await fetcher.get(requestURL)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const cveidSearch = async (requestURL) => {
    try {
        const { data } = await fetcher.get(requestURL)
        return data;
    } catch (error) {
        throw error.message;
    }
}

const getSigByAttacks = async () => {
    try {
        const { data } = await fetcher.get('/signature/attacks')
        return data;
    } catch (error) {
        throw error.message;
    }
}

export {
    updateQaDashboard,
    getQaDashboard,
    searchSignature,
    copySignature,
    getExportSignatures,
    exportSignaturesTofile,
    exportAllSignaturesTofile,
    getResearcher,
    getSignatures,
    cveidSearch,
    getSigByAttacks
};