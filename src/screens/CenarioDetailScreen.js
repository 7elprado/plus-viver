import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
const colors = {
  primary: '#6C63FF',
  danger: '#E74C3C',
  white: '#FFFFFF',
};
const isWeb = Platform.OS === 'web';
export default function CenarioDetailScreen({ route, navigation }) {
  const { cenario } = route.params;
  const [mostrarLeis, setMostrarLeis] = useState(false);
  const [mostrarHospitais, setMostrarHospitais] = useState(false);
  const [mostrarEmpresas, setMostrarEmpresas] = useState(false);
  const solucoes = {
    saude: {
      titulo: '🏥 SAÚDE COM DIGNIDADE',
      acoes: [
        { nome: 'Médico Especialista', descricao: 'Agendar consulta com médico especialista em obesidade (R$ 30 social)' },
        { nome: 'Hospital Adaptado', descricao: 'Encontrar hospitais com maca até 250kg e ressonância aberta' },
        { nome: 'Cirurgia Bariátrica SUS', descricao: 'Verificar tempo de espera e entrar na fila' },
      ],
      leis: [
        { nome: 'Lei 9.656/1998', descricao: 'Planos de saúde são obrigados a cobrir cirurgia bariátrica' },
        { nome: 'Resolução CFM', descricao: 'Médicos não podem negar atendimento por peso' },
      ],
      dadosExtra: {
        titulo: '🏥 HOSPITAIS PARCEIROS',
        items: [
          { nome: 'Hospital das Clínicas - SP', info: '⏱️ 18 meses • 📞 (11) 2661-0000' },
          { nome: 'Hospital Universitário - RJ', info: '⏱️ 24 meses • 📞 (21) 3938-2000' },
          { nome: 'Hospital das Clínicas - MG', info: '⏱️ 15 meses • 📞 (31) 3409-9000' },
        ]
      }
    },
    trabalho: {
      titulo: '🏢 TRABALHO INCLUSIVO',
      acoes: [
        { nome: 'Vagas Afirmativas', descricao: 'Empresas contratando exclusivamente pessoas obesas' },
        { nome: 'Empresa Inclusiva', descricao: 'Ver empresas com selo de inclusão' },
        { nome: 'Denunciar Discriminação', descricao: 'Processo por danos morais (Lei 14.532/2023)' },
      ],
      leis: [
        { nome: 'Lei 14.532/2023', descricao: 'Discriminação por peso é crime com pena de 1 a 3 anos' },
        { nome: 'Lei 13.146/2015', descricao: 'Obesidade é equiparada à deficiência' },
      ],
      dadosExtra: {
        titulo: '🏢 EMPRESAS INCLUSIVAS',
        items: [
          { nome: 'Magazine Luiza', info: '🔴 15 vagas afirmativas • ✅ Selo Inclusivo' },
          { nome: 'Nubank', info: '🔴 8 vagas afirmativas • ✅ Selo Inclusivo' },
          { nome: 'Bradesco', info: '🔴 12 vagas afirmativas • ✅ Programa de Inclusão' },
        ]
      }
    },
    transporte: {
      titulo: '🚌 TRANSPORTE QUE SERVE',
      acoes: [
        { nome: 'Cinto Extensor', descricao: 'Empresas que fornecem cinto discreto' },
        { nome: 'Denúncia Anônima', descricao: 'Reportar transporte que discrimina' },
        { nome: 'Modelo de Processo', descricao: 'Ação por humilhação pública' },
      ],
      leis: [
        { nome: 'Lei de Acessibilidade', descricao: 'Transportes devem ser adaptados para todos' },
        { nome: 'Lei 14.532/2023', descricao: 'Humilhação pública é crime' },
      ],
      dadosExtra: {
        titulo: '🚌 EMPRESAS COM CINTO EXTENSOR',
        items: [
          { nome: 'Latam Airlines', info: '✅ Cinto extensor discreto • Peça no check-in' },
          { nome: 'Gol Linhas Aéreas', info: '✅ Cinto extensor • Assistência especial' },
          { nome: 'Azul Linhas Aéreas', info: '✅ Protocolo sigiloso • Sem constrangimento' },
        ]
      }
    },
    educacao: {
      titulo: '🎓 EDUCAÇÃO INCLUSIVA',
      acoes: [
        { nome: 'Cadeira Adaptada', descricao: 'Universidades com cadeiras largas' },
        { nome: 'Requerimento', descricao: 'Modelo para solicitar adaptação' },
        { nome: 'Denúncia ao MEC', descricao: 'Notificar ministério sobre exclusão' },
      ],
      leis: [
        { nome: 'LBI - Lei 13.146/2015', descricao: 'Direito a adaptações em instituições de ensino' },
      ],
      dadosExtra: {
        titulo: '🎓 UNIVERSIDADES ADAPTADAS',
        items: [
          { nome: 'USP - São Paulo', info: '✅ Cadeiras largas • Rampas • Banheiros adaptados' },
          { nome: 'UNICAMP - Campinas', info: '✅ Estrutura inclusiva • Núcleo de acessibilidade' },
          { nome: 'UFRJ - Rio de Janeiro', info: '✅ Programa de inclusão • Adaptações disponíveis' },
        ]
      }
    },
    amor: {
      titulo: '❤️ AMOR SEM TAMANHO',
      acoes: [
        { nome: 'App Exclusivo', descricao: 'App de relacionamento para pessoas obesas' },
        { nome: 'Terapia em Grupo', descricao: 'Grupos de apoio para autoestima' },
        { nome: 'Denunciar Preconceito', descricao: 'Processar apps que rejeitam corpos gordos' },
      ],
      leis: [
        { nome: 'Lei 14.532/2023', descricao: 'Discriminação em apps é crime' },
      ],
      dadosExtra: {
        titulo: '❤️ GRUPOS DE APOIO',
        items: [
          { nome: 'Amor Plus - WhatsApp', info: '👥 2.500 membros • Link para entrar' },
          { nome: 'Solteiros Plus - Facebook', info: '👥 15.000 membros • Encontros mensais' },
          { nome: 'Terapia Coletiva - Online', info: '🎥 Sessões semanais • R$ 20 por encontro' },
        ]
      }
    },
    lazer: {
      titulo: '🎬 LAZER PARA TODOS',
      acoes: [
        { nome: 'Livre Acesso', descricao: 'Encontrar locais adaptados perto de você' },
        { nome: 'Botão da Vergonha', descricao: 'Denunciar discriminação com foto' },
        { nome: 'Indenização Coletiva', descricao: 'Ação judicial contra redes exclusivistas' },
      ],
      leis: [
        { nome: 'Lei de Acessibilidade', descricao: 'Locais públicos devem ser adaptados' },
      ],
      dadosExtra: {
        titulo: '🎬 LOCAIS ADAPTADOS',
        items: [
          { nome: 'Cinemark - Rede Nacional', info: '✅ Assentos largos • Cadeiras removíveis' },
          { nome: 'Playcenter - SP', info: '✅ Brinquedos adaptados • Fila prioritária' },
          { nome: 'Clube Plus - RJ', info: '✅ Espaço exclusivo para pessoas obesas' },
        ]
      }
    },
    dignidade: {
      titulo: '⚰️ DIGNIDADE NA MORTE',
      acoes: [
        { nome: 'Caixão Popular', descricao: 'Mutirão de caixões plus size (R$ 800)' },
        { nome: 'Plano Funerário Inclusivo', descricao: 'Planos que cobrem corpo obeso' },
        { nome: 'Denunciar Funerária', descricao: 'Reportar cobrança abusiva' },
      ],
      leis: [
        { nome: 'CDC - Art. 39', descricao: 'Cobrança abusiva é crime' },
      ],
      dadosExtra: {
        titulo: '⚰️ FUNERÁRIAS PARCEIRAS',
        items: [
          { nome: 'Funerária Plus - Nacional', info: '💰 Caixão plus: R$ 800 • Plano a partir de R$ 30/mês' },
          { nome: 'Despedida Digna - SP', info: '💰 Caixão plus: R$ 950 • Atendimento humanizado' },
          { nome: 'Acolher - RJ', info: '💰 Caixão plus: R$ 850 • Assistência completa' },
        ]
      }
    }
  };
  const dados = solucoes[cenario] || solucoes.saude;
  const handleAcao = (acao) => {
    Alert.alert(
      'Funcionalidade em desenvolvimento',
      `${acao.nome}\n\nEm breve você poderá acessar esta funcionalidade completa!\n\nEnquanto isso, registre uma denúncia no menu principal.`,
      [{ text: 'OK' }]
    );
  };
  const Content = () => (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← VOLTAR</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{dados.titulo}</Text>
      </View>

      <Text style={styles.sectionTitle}>🔧 SOLUÇÕES DISPONÍVEIS</Text>
      {dados.acoes.map((acao, idx) => (
        <Pressable
          key={idx}
          style={styles.acaoCard}
          onPress={() => handleAcao(acao)}
        >
          <View style={styles.acaoIcon}>
            <Text style={styles.acaoIconText}>{idx === 0 ? '1️⃣' : idx === 1 ? '2️⃣' : '3️⃣'}</Text>
          </View>
          <View style={styles.acaoContent}>
            <Text style={styles.acaoNome}>{acao.nome}</Text>
            <Text style={styles.acaoDescricao}>{acao.descricao}</Text>
            <Text style={styles.acaoLink}>🔗 Clique para acessar →</Text>
          </View>
        </Pressable>
      ))}
      <Pressable
        style={styles.leisButton}
        onPress={() => setMostrarLeis(!mostrarLeis)}
      >
        <Text style={styles.buttonText}>⚖️ VER LEIS QUE TE PROTEGEM</Text>
      </Pressable>

      {mostrarLeis && (
        <View style={styles.leisContainer}>
          {dados.leis.map((lei, idx) => (
            <View key={idx} style={styles.leiCard}>
              <Text style={styles.leiNome}>{lei.nome}</Text>
              <Text style={styles.leiDescricao}>{lei.descricao}</Text>
            </View>
          ))}
        </View>
      )}
      {dados.dadosExtra && (
        <>
          <Pressable
            style={styles.dadosExtraButton}
            onPress={() => {
              if (cenario === 'saude') setMostrarHospitais(!mostrarHospitais);
              if (cenario === 'trabalho') setMostrarEmpresas(!mostrarEmpresas);
              else setMostrarHospitais(!mostrarHospitais);
            }}
          >
            <Text style={styles.buttonText}>{dados.dadosExtra.titulo}</Text>
          </Pressable>

          {(mostrarHospitais || mostrarEmpresas) && (
            <View style={styles.dadosExtraContainer}>
              {dados.dadosExtra.items.map((item, idx) => (
                <View key={idx} style={styles.dadosExtraCard}>
                  <Text style={styles.dadosExtraNome}>{item.nome}</Text>
                  <Text style={styles.dadosExtraInfo}>{item.info}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
      <Pressable
        style={styles.denunciaRapidaButton}
        onPress={() => navigation.navigate('Denuncia')}
      >
        <Text style={styles.denunciaRapidaText}>⚡ FAZER DENÚNCIA AGORA</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Lei 14.532/2023 - Gordofobia é crime!</Text>
        <Text style={styles.footerText}>Disque 100 - Denuncie discriminação</Text>
      </View>
    </>
  );
  if (isWeb) {
    return (
      <div style={{ height: '100vh', overflowY: 'auto', backgroundColor: '#F5F7FA' }}>
        <Content />
      </div>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Content />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 15,
  },
  backText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
    color: '#333',
  },
  acaoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  acaoIcon: {
    width: 40,
    justifyContent: 'center',
  },
  acaoIconText: {
    fontSize: 24,
  },
  acaoContent: {
    flex: 1,
  },
  acaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  acaoDescricao: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  acaoLink: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  leisButton: {
    backgroundColor: '#9B59B6',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  dadosExtraButton: {
    backgroundColor: '#2ECC71',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  leisContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  leiCard: {
    backgroundColor: '#E8E2F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  leiNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7B2CBF',
    marginBottom: 4,
  },
  leiDescricao: {
    fontSize: 12,
    color: '#555',
  },
  dadosExtraContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  dadosExtraCard: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  dadosExtraNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 4,
  },
  dadosExtraInfo: {
    fontSize: 12,
    color: '#555',
  },
  denunciaRapidaButton: {
    backgroundColor: colors.danger,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  denunciaRapidaText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#2C3E50',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: colors.white,
    fontSize: 11,
    textAlign: 'center',
  },
});
