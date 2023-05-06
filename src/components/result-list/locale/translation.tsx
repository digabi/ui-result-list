export const getTranslationResources = () => ({
  fi: {
    translation: {
      results: {
        compensated: 'komp.',
        not_compensated: 'ei komp.',
        points: 'pt',
        aborted: 'Keskeytetty',
        invalidated: 'Mitätöity',
        extra_exam_short: 'ylim.',
        mandatory_exam_short: 'pakoll.',
        grade_raised: 'Korotettu',
        included_exams: 'Sisällytetyt kokeet',
        dyslexia: 'lukilausunto',
        statement: 'lääkärinlausunto',
        technical_error: 'Häiriö kokeen aikana',
        groups: {
          yoGraduated: {
            navigation: 'Ylioppilas',
            title: 'Ylioppilas',
            description: 'Kokelas on suorittanut ylioppilastutkinnon hyväksytysti ja saa ylioppilastutkintotodistuksen.'
          },
          noGraduation: {
            navigation: 'Opinnot suorittamatta',
            title: 'Opinnot suorittamatta',
            description:
              'Kokelas on suorittanut ylioppilastutkintoon vaadittavat kokeet hyväksytysti, mutta lukion oppimäärän tai ammatillisen tutkinnon suorittaminen on kesken. Kokelas suorittaa ylioppilastutkinnon ja saa ylioppilastutkintotodistuksen suoritettuaan lukion oppimäärän, ammatillisen perustutkinnon tai muun ylioppilastutkintoon oikeuttavan opintokokonaisuuden.'
          },
          examinationOnGoing: {
            navigation: 'Tutkinto kesken',
            title: 'Tutkinto kesken',
            description:
              'Kokelas on aloittanut ylioppilastutkinnon suorittamisen hajautetusti, mutta ei ole vielä suorittanut kaikkia ylioppilastutkintoon vaadittavia kokeita hyväksytysti. Hän voi jatkaa kokeiden suorittamista tulevilla tutkintokerroilla.'
          },
          canGraduateWithRetryAttempt: {
            navigation: 'Tutkinto kesken, voi valmistua vain uusimalla',
            title: 'Tutkinto kesken, voi valmistua vain uusimalla',
            description:
              'Kokelas on ilmoittautunut ylioppilastutkintoon vaadittaviin kokeisiin, mutta ei ole saanut joistakin kokeista hyväksyttyä arvosanaa. Kokelas ei myöskään saa tutkintoaan valmiiksi kompensaation kautta. Hän voi kuitenkin jatkaa tutkinnon suorittamista uusimalla hylättyjä kokeita.'
          },
          degreeRejected: {
            navigation: 'Tutkinto hylätty',
            title: 'Tutkinto hylätty',
            description:
              'Kokelas on suorittanut ylioppilastutkinnon kokeita, mutta ei ole suorittanut koko ylioppilastutkintoa hyväksytysti. Hän on käyttänyt kaikki yrityskertansa ja joutuu aloittamaan tutkinnon suorittamisen alusta.  Tässä kategoriassa näytetään myös kokelaat, jotka hakemuksesta ovat aloittamassa tutkintoaan alusta. Jos kesken olevan tutkinnon aloittaa hakemuksesta alusta, hyväksyttyjä kokeita ei voi sisällyttää uuteen tutkintoon.  Kokelas saa erillisen todistuksen hyväksytysti suoritetuista kokeista.'
          },
          afterGraduation: {
            navigation: 'Korottaja tai täydentäjä',
            title: 'Korottaja tai täydentäjä',
            description:
              'Kokelas on suorittanut ylioppilastutkinnon hyväksytysti jollain edellisellä tutkintokerralla. Kokelas saa erillisen todistuksen kuluvan tutkintokerran hyväksytyistä suorituksista.'
          },
          separateExam: {
            navigation: 'Erillisen kokeen suorittaja',
            title: 'Erillisen kokeen suorittaja',
            description:
              'Kokelas suorittaa erillisiä kokeita, jotka eivät muodosta ylioppilastutkintoa. Kokelas saa erillisen todistuksen kuluvan tutkintokerran hyväksytyistä suorituksista.'
          }
        }
      },
      autumn: 'Syksy',
      spring: 'Kevät'
    }
  },
  sv: {
    translation: {
      results: {
        compensated: 'komp.',
        not_compensated: 'ej komp.',
        points: 'p.',
        aborted: 'avbrutet',
        invalidated: 'annullerat',
        extra_exam_short: 'extra',
        mandatory_exam_short: 'oblig.',
        grade_raised: 'höjt.',
        included_exams: 'Innefattade prov',
        dyslexia: 'utlåtande över läs- och skrivsvårigheter',
        statement: 'läkarintyg',
        technical_error: 'Störning under provet',
        groups: {
          yoGraduated: {
            navigation: 'Student',
            title: 'Student',
            description: 'Examinanden har avlagt studentexamen och får studentexamensbetyg.'
          },
          noGraduation: {
            navigation: 'Studierna ej avlagda',
            title: 'Studierna ej avlagda',
            description:
              'Examinanden har avlagt proven som krävs för examen men gymnasiets lärokurs eller yrkesinriktad grundexamen är inte avlagd. Examinanden avlägger studentexamen och får studentexamensbetyg då hen avlagt gymnasiets lärokurs, yrkesinriktad grundexamen eller motsvarande annan studiehelhet som berättigar till avläggande av studentexamen.'
          },
          examinationOnGoing: {
            navigation: 'Pågående examen',
            title: 'Pågående examen',
            description:
              'Examinanden avlägger studentexamen under flera examenstillfällen men har ännu inte avlagt alla prov som krävs för examen med godkänt betyg. Examinanden kan fortsätta avlägga studentexamen vid kommande examenstillfällen.'
          },
          canGraduateWithRetryAttempt: {
            navigation: 'Pågående examen, kräver omtagning',
            title: 'Pågående examen, kräver omtagning',
            description:
              'Examinanden har anmält sig till de prov som krävs för examen, men har inte fått godkänt vitsord på något av proven. Examinanden kan inte heller få examen klar genom kompensation. Hen kan dock fortsätta sin examen genom att ta om underkända prov.'
          },
          degreeRejected: {
            navigation: 'Examen underkänd',
            title: 'Examen underkänd',
            description:
              'Examinanden har avlagt prov i studentexamen men har inte avlagt hela studentexamen. Examinanden har använt alla försök och måste börja avlägga examen från början. I denna kategori visas också examinander som på ansökan börjar sin examen från början. Om en påbörjad examen på ansökan börjas från början kan godkända prov inte innefattas i den nya examen.  Examinanden får separat betyg över godkända prov.'
          },
          afterGraduation: {
            navigation: 'Kompletterar eller höjer',
            title: 'Kompletterar eller höjer',
            description:
              'Examinanden har avlagt studentexamen under ett tidigare examenstillfälle. Examinanden får separat betyg över de godkända provprestationerna vid detta examenstillfälle.'
          },
          separateExam: {
            navigation: 'Avlägger enskilt prov',
            title: 'Avlägger enskilt prov',
            description:
              'Examinanden avlägger enskilda prov som inte bildar studentexamen. Examinanden får separat betyg över de godkända provprestationerna vid detta examenstillfälle.'
          }
        }
      },
      autumn: 'Hösten',
      spring: 'Våren'
    }
  }
})
