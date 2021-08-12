import { Story, StoryPage, StoryState } from './interface';

export const mockStories: Story[] = (() => {
  const now = Date.now();

  return [
    {
      storyId: 'story-1',
      state: StoryState.PUBLISHED,
      title: 'Test Story',
      entryPageId: 'page-1',
      authorUserId: 'user-1',
      createdAt: now,
      updatedAt: now,
    },
  ];
})();

export const mockStoryPages = (() => {
  return [
    {
      pageId: 'page-1',
      storyId: 'story-1',
      name: 'Entry',
      content:
        'El líder de Brigbürg, un anciano mago, abandonó la ciudad hace varios días dejando a cargo del gobierno a uno de sus subalternos. Ante el vacío de poder, los habitantes de la ciudad se rebelan. Están hartos de que los magos monopolicen el poder. En medio de los tumultos, ante el palacio del mago, el centro de poder, se encuentra nuestro héroe. Sabe que algo no está bien. Los magos han gobernado con puño de hierro, pero no es menos cierto que él ha trabajado para este gobierno y que si el actual lugarteniente cae, bien podría él acabar en el patíbulo. Pero podría liderar la revuelta. Es popular en la ciudad y la gente le escucha. ¿O tal vez debería capturar primero capturar al actual gobernador para negociar directamente con él su rendición?',
      options: [
        {
          type: 'text',
          pageId: 'page-2',
          text: 'Liderar revuelta',
        },
        { type: 'text', pageId: 'page-3', text: 'Escabullirse' },
      ],
    },
    {
      pageId: 'page-2',
      storyId: 'story-1',
      name: 'Liderar',
      content:
        'Nuestro héroe decide liderar la revuelta y consigue tirar la puerta del palacio y capturar al lugarteniente, que es llevado de inmediato a los calabozos. El pueblo pide un nuevo gobierno y la cabeza de los magos. Pero la amenaza del regreso del anciano mago pende sobre sus cabezas. Para evitar que la revolución fracase, deben enviar una misión cuyo objetivo es acabar con él. El héroe acepta y recibe una generosa suma de dinero para contratar a varios guerreros. Nunca antes ha visto tal cantidad dinero. Tal vez incluso podría huir y empezar de nuevo, con otro nombre y en otro lugar. ¿Pero es un traidor? Podría liberar al lugarteniente, huir con él en busca del anciano mago para liquidarlo en solitario, así podría cumplir su misión y quedarse con el botín.',
      options: [
        { type: 'text', pageId: 'page-4', text: 'Contratar amigos' },
        { type: 'text', pageId: 'page-5', text: 'Huir con el dinero' },
        { type: 'text', pageId: 'page-6', text: 'Disfrazarse y huir' },
      ],
    },
    {
      pageId: 'page-3',
      storyId: 'story-1',
      name: 'Escabullirse',
      content:
        'Nuestro héroe se escabulle de la multitud y logra acceder al palacio sin que le vean. Dentro del edificio, blandiendo su hacha, pilla por sorpresa al lugarteniente. Observa que la sala del anciano mago está prácticamente vacía y desordenada. El lugarteniente, bajo amenaza, le cuenta que el anciano mago huyó en un carro en secreto con todos sus objetos mágicos, pergaminos y códices. Ni siquiera él sabe bien su destino ni sus intenciones. Solo sabe que huyó hacia el sur rodeando la ciudad de madrugada. Nuestro héroe podría sacar al lugarteniente a la plaza pública para ejecutarlo ante las masas, o llevárselo como rehén para buscar al anciano mago en busca de respuestas.',
      options: [
        { type: 'text', pageId: 'page-6', text: 'Disfrazarse y huir' },
        {
          type: 'text',
          pageId: 'page-7',
          text: 'Deshacerse del lugarteniente',
        },
      ],
    },
    {
      pageId: 'page-4',
      storyId: 'story-1',
      name: 'Amigos',
      content:
        'Nuestro héroe decide contratar a dos viejos amigos para la misión y parte hacia el sur en busca de pistas para descubrir el paradero del mago. El puerto es un lugar en el que se mueve mucha información. A mitad de camino, sin embargo, una fuerte ventisca les sorprende. Parece algo antinatural. ¿Podría ser obra del anciano mago? El grupo debe refugiarse cuanto antes. Nuestro héroe cree que la mejor opción es adentrarse en el bosque, pero los otros temen perderse. Uno de ellos sugiere bajar hacia las cuevas del acantilado o retroceder un poco y buscar refugio en los panteones del camposanto abandonado. ',
      options: [
        { type: 'text', pageId: 'page-9', text: 'Ir al bosque' },
        { type: 'text', pageId: 'page-10', text: 'Ir al acantilado' },
        { type: 'text', pageId: 'page-11', text: 'Ir a camposanto' },
      ],
    },
    {
      pageId: 'page-5',
      storyId: 'story-1',
      name: 'Lado oscuro',
      content:
        'Nuestro héroe no es tan bueno como parece. Sabe que la sociedad de Brigbürg está corrupta, y que tarde o temprano habrá un baño de sangre y su cabeza correrá peligro. Toma el dinero, pero decide huir. Esta es su oportunidad para abandonar estas tierras y buscar fortuna en otro continente. Pero no está solo. Un viejo conocido sospecha sus intenciones y le sigue con sigilo cuando abandona la ciudad. Por el camino le sorprende y descubre sus planes. Nuestro héroe compartirá la mitad del botín para que no le delate, y juntos huirán del continente. ¿Pero dónde deben ir primero? Es tarde. ¿Deben dirigirse hacia el puerto o parar en alguna aldea o posta cercana para salir al día siguiente?',
      options: [
        { type: 'text', pageId: 'page-12', text: 'Ir al puerto' },
        { type: 'text', pageId: 'page-13', text: 'Ir a una aldea' },
      ],
    },
    {
      pageId: 'page-6',
      storyId: 'story-1',
      name: 'Huída',
      content:
        'El héroe y el lugarteniente huirán de la ciudad vestidos de campesinos. Una vez lejos de la turba, se acercarán a la ciudad más cercana en busca de información. En una taberna escucharán rumores de que los magos gobernadores de otras grandes ciudades de estas tierras también han abandonado sus palacios en secreto, sin anunciar sus intenciones y dejando un vacío de poder. En la taberna se especula que han partido hacia las ciudades antiguas, pero otros dicen que han abandonado este continente temiendo una revolución. ¿Deben salir cuanto antes hacia el sur, para comprobar si el anciano ha huido en un barco como ellos creen o partir hacia las ciudades antiguas, al este?',
      options: [
        { type: 'text', pageId: 'page-14', text: 'Ir hacia el sur' },
        { type: 'text', pageId: 'page-15', text: 'Ir hacia el este' },
      ],
    },
    {
      pageId: 'page-7',
      storyId: 'story-1',
      name: '',
      content:
        'Nuestro héroe lleva a empujones al lugarteniente a los escalones del palacio. Un antiguo miembro de la guardia, autoproclamado líder de la revolución, ordena su ejecución. Nuestro héroe no titubea y la cabeza del lugarteniente rueda escaleras abajo. El antiguo miembro de la guardia, ahora caudillo, entrega una importante suma de dinero al héroe para que forme un grupo para encontrar y liquidar al anciano mago. Nuestro héroe debe decidir si contrata a dos viejos compañeros de batalla o si utiliza el dinero para contratar a diez mercernarios y formar un pequeño escuadrón',
      options: [
        { type: 'text', pageId: 'page-4', text: 'Contratar amigos' },
        { type: 'text', pageId: 'page-16', text: 'Diez mercenarios' },
      ],
    },
    {
      pageId: 'page-9',
      storyId: 'story-1',
      name: 'Bosque',
      content:
        'La maleza frondosa les ofrece un refugio durante la ventisca, pero pronto se ven rodeados de árboles y vegetación y no consiguen recordar por dónde han venido. Sus peores presagios se hacen realidad. Oscurece y el bosque se llena de sonidos extraños y amenazantes. Unas criaturas extrañas salen a su paso. Dicen que estos bosques son los dominios de un druida. ¿Atacan, intentan huir o tratan de comunicarse con estos seres?',
    },
    {
      pageId: 'page-10',
      storyId: 'story-1',
      name: 'Cuevas del acantilado',
      content:
        'Nuestro grupo encuentra refugio en las húmedas cuevas del acantilado, no muy lejos del puerto. Deciden adentrarse un poco más en las cuevas para resguardarse mejor del viento y descubren unas luces al fondo. Tal vez sean marineros y puedan compartir un fuego. Sin embargo, caen en la trampa de unas criaturas humanoides con escamas. No conocen de qué raza se trata, o si son hostiles o simplemente se están defendiendo. ¿Atacar o negociar? El tiempo apremia',
    },
    {
      pageId: 'page-11',
      storyId: 'story-1',
      name: 'Camposanto',
      content:
        'Aquí están enterrados los muertos de una batalla ya olvidada por los pueblos que hoy habitan estas tierras. Casi nadie se acerca a este lugar solitario y silencioso, donde se siente el peso de la muerte. En el centro encuentran un enorme mausoleo semienterrado y deciden pasar la noche allí. Descubren que no están solos. En él vive un mago ermitaño que les acoge. El mago se encuentra en muy mal estado de salud. Les encomienda una misión: encontrar una sustancia que necesita para completar un brebaje que le curará. ¿Aceptan o tiene una misión más importante entre manos?',
    },
    {
      pageId: 'page-12',
      storyId: 'story-1',
      name: 'Hacia el puerto',
      content: 'N/A',
    },
    {
      pageId: 'page-13',
      storyId: 'story-1',
      name: 'Hacia una pequeña aldea',
      content: 'N/A',
    },
    {
      pageId: 'page-14',
      storyId: 'story-1',
      name: 'Hacia el sur',
      content: 'N/A',
    },
    {
      pageId: 'page-15',
      storyId: 'story-1',
      name: 'Hacia el este',
      content: 'N/A',
    },
    {
      pageId: 'page-16',
      storyId: 'story-1',
      name: 'Diez mercenarios',
      content: 'N/A',
    },
  ] as StoryPage[];
})();
