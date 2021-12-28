import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "To get started, edit <1>src/App.js</1> and save to reload.":
                        "To get started, edit <1>src/App.js</1> and save to reload.",
                    "Welcome to Duma solutions": "Welcome to Duma solutions",
                    "Payer Information":"Payer Information",
                    "Name on the card":"Name on the card",
                    "Email address":"email address",
                    "Phone Number":"Phone Number",
                    "Currency":"Currency",
                    "Currency :":"Currency :",
                    "Payment method":"Payment method",
                    "Debit card":"Debit card",
                    "Mobile Money":"Mobile money",
                    "Amount":"Amount",
                    "Receive":"Receive",
                    "From":"From",
                    "To":"To",
                    "Next":"Next",
                    "Processing...":"Processing...",
                    "Back":"Back",
                    "Pay Now":"Pay Now",
                    "Close":"Close",
                    "Legal Notice":"Legal Notice",
                    "Privacy Notice":"Privacy Notice",
                    "Terms of Use":"Terms of Use",
                    "Trademarks":"Trademarks",
                    "Payment Details":"Payment Details",
                    "Sender :":"Sender :",
                    "Receiver :":"Receiver :",
                    "Amount to send :":"Amount to send:",
                    "Fees :":"Fees :",
                    "Total :":"Total :",
                    "Rate :":"Rate :",
                    "Card Information":"Card Information",
                    "Mobile money Information":"Mobile money Information",
                    "Not found":"Not found",
                    "Oups!!, something just went wrong!":"Oups!!, something just went wrong!",
                    "Sorry, page not found!":"Sorry, page not found",
                    "Go back":"Go back",
                    "Confirmation":"Confirmation",
                    "Your payment to:":"Your payment to:",
                    "Passed successfully, thank you for reaching out! You can order another payment link for another payment":"passed successfully, thank you for reaching out! You can order another payment link for another payment",
                    "English":"English",
                    "French":"French",
                    "has failed, please check informations and retry.":"has failed, please check informations and retry.",
                    "Retry":"Retry",
                    "Information":"Information",
                    "Payment Information":"Payment Information",
                    "is being processed, confirm the operation with your mobile phone, then click the button bellow to refresh the status :)":"is being processed, confirm the operation with your mobile phone, then click the button bellow to refresh the status :)",
                    "Refreshing Status...":"Refreshing Status...",
                    "Refresh":"Refresh",

                }
            },
            fr: {
                translations: {
                    "To get started, edit <1>src/App.js</1> and save to reload.":
                        "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
                    "Welcome to Duma solutions": "Bienvenu chez Duma solutions",
                    "Payer Information":"Information du Payeur",
                    "Name on the card":"Nom sur carte",
                    "Email address":"Adresse mail",
                    "Phone Number":"Numéro téléphone",
                    "Currency":"Devise",
                    "Currency :":"Devise :",
                    "Payment method":"Méthode de payement",
                    "Debit card":"Debit carte",
                    "Mobile Money":"Mobile money",
                    "Amount":"Montant",
                    "Receive":"Reçois",
                    "From":"De",
                    "To":"Vers",
                    "Next":"Suivant",
                    "Processing...":"Chargement...",
                    "Back":"Précédent",
                    "Pay Now":"Payer maintenant",
                    "Close":"Fermer",
                    "Legal Notice":"Mentions Légales",
                    "Privacy Notice":"Politique de confidentialité",
                    "Terms of Use":"Termes d'utilisation",
                    "Trademarks":"Marque de fabrique",
                    "Payment Details":"Détails de payement",
                    "Sender :":"Expéditeur :",
                    "Receiver :":"Destinataire :",
                    "Amount to send:":"Montant à envoyer:",
                    "Fees :":"Frais :",
                    "Total :":"Total :",
                    "Rate :":"Taux :",
                    "Card Information":"Information de la carte",
                    "Mobile money Information":"Information de Mobile money",
                    "Not found":"Pas de contenu",
                    "Oups!!, something just went wrong!":"Oups!!, quelque chose n'a pas fonctionnée correctement!",
                    "Sorry, page not found!":"Désolé, la page n'a pas été trouvée!",
                    "Go back":"Retour",
                    "Confirmation":"Confirmation",
                    "Your payment to:":"Votre payement à :",
                    "Passed successfully, thank you for reaching out! You can order another payment link for another payment":"A été effectué avec succès, nous vous en remerçions! Demandez un autre lien pour effectuer un autre payment",
                    "English":"Anglais",
                    "French":"Français",
                    "has failed, please check informations and retry.":"a échoué, verifiez les informations fournies et ressayez s'il vous plait.",
                    "Retry":"Ressayer",
                    "Information":"Information",
                    "Payment Information":"Information de payement",
                    "is being processed, confirm the operation with your mobile phone, then click the button bellow to refresh the status :)":"s'effectue, confirmez l'operation avec votre téléphone ensuite cliquez sur le button pour actualiser le status :)",
                    "Refreshing Status...":"Actualisation du status...",
                    "Refresh":"Actualiser",

                }
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    }).then();

export default i18n;
