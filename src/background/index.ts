chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "linkQuoteClip",
		title: "Copy Selection with link",
		contexts: ["selection"],
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "linkQuoteClip" && info.selectionText) {
		executeCopySelectionWithLink(info.selectionText, tab);
	}
});

const executeCopySelectionWithLink = (
	selectedText: string,
	tab?: chrome.tabs.Tab,
) => {
	if (tab?.id !== undefined) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: async (text) => {
				try {
					const link = window.location.href;
					const selectedText = text ?? window.getSelection()?.toString();

					if (!selectedText) {
						console.error("No text selected or provided.");
						return;
					}

					const formattedText = `> ${selectedText}\n\n${link}#:~:text=${encodeURIComponent(selectedText)}`;

					const input = document.createElement("textarea");
					document.body.appendChild(input);
					input.value = formattedText;
					input.select();
					await navigator.clipboard.writeText(formattedText);
					document.body.removeChild(input);
				} catch (error) {
					console.error("failed to copy text", error);
				}
			},
			args: [selectedText],
		});
	}
};
