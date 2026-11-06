const repository = 'https://github.com/haoyunLi/PaperBridge'

export const macDownloadURL = `${repository}/releases/latest/download/PaperBridge.dmg`
export const windowsVersion = '0.2.8'
// Windows has its own release channel; GitHub's global latest remains the Mac release.
export const windowsReleaseURL = `${repository}/releases/tag/windows-v${windowsVersion}`
export const windowsDownloadURL = `${repository}/releases/download/windows-v${windowsVersion}/PaperBridge-Windows-${windowsVersion}-x64-Setup.exe`
export const windowsPortableURL = `${repository}/releases/download/windows-v${windowsVersion}/PaperBridge-Windows-${windowsVersion}-x64-Portable.exe`
export const windowsGuideURL = `${repository}/blob/windows-v${windowsVersion}/windows/README.md`
