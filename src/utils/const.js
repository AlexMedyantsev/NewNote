export const notes = [
  {
    name: '',
    id: 0,
    text: `Overview проектa NewNote:
Это приложение мой личный Pet Project.

- Оно адаптировано как для пк, так и для планшетов и телефонов 

- У приложения Следующий функционал:
  • Возможность создавать и редактировать Заметки
  • Возможность искать заметки 
  • Возможность создавть папки и удалять их
  • Данные сохраняются через Local Storage
`,
    tags: [],
    inFolders: ['Все Заметки'],
    createdDate: '',
    isActive: true,
  },
  {
    name: '',
    id: 1,
    text: `Заметка без смысла

С другой стороны реализация намеченных плановых заданий требуют от нас анализа новых предложений. Товарищи! новая модель организационной деятельности позволяет оценить значение соответствующий условий активизации. Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции позволяет оценить значение новых предложений. Равным образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа форм развития.    `,
    tags: [],
    inFolders: ['Все Заметки'],
    createdDate: '',
    isActive: false,
  },
]

export const folders = [
  {
    name: 'Все Заметки',
    canBeDeleted: false,
  }
]

export function Note(id, createdDate, activeFolder) {
  this.name = '';
  this.id = id;
  this.text = `Новая заметка`;
  this.tags = [];
  if (activeFolder === 'Все Заметки') {
    this.inFolders = [activeFolder]
  } else {
    this.inFolders = ['Все Заметки', activeFolder]
  }
  this.createdDate = createdDate;
}

export const MAX_PREVIEW_LINE_LENGTH = 40;
export const MOBILE_BREAKPOINT = 768;
