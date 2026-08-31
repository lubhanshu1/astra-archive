// LocalStorage Research Collections
export const CollectionManager = {
    save: (name: string, artifactIds: string[]) => {
        const collections = JSON.parse(localStorage.getItem('astra_collections') || '{}');
        collections[name] = artifactIds;
        localStorage.setItem('astra_collections', JSON.stringify(collections));
    },

    load: (name: string) => {
        const collections = JSON.parse(localStorage.getItem('astra_collections') || '{}');
        return collections[name] || [];
    },

    exportCSV: (artifacts: any[]) => {
        if (!artifacts.length) return;
        const headers = Object.keys(artifacts[0]).join(',');
        const rows = artifacts.map(a => Object.values(a).map(val => `"${val}"`).join(',')).join('\n');
        const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'astra_export.csv';
        a.click();
    }
};